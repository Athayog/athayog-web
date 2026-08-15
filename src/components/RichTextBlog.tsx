import type { RichTextField, RTNode, RTTextNode } from "@prismicio/client";
import type { JSXMapSerializer } from "@prismicio/react";
import { PrismicRichText, PrismicLink } from "@prismicio/react";
import { paragraphBlock, splitTableBlock, type TableData } from "@/lib/blog";
import styles from "@/components/RichTextBlog.module.css";

const richTextComponents: JSXMapSerializer = {
	heading1: ({ children }) => (
		<h1
			style={{
				fontFamily: "var(--font-display)",
				fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)",
				fontWeight: 600,
				lineHeight: 1.2,
				margin: "32px 0 8px",
				color: "var(--ink)",
			}}
		>
			{children}
		</h1>
	),
	heading2: ({ children }) => (
		<h2
			style={{
				fontFamily: "var(--font-display)",
				fontSize: "clamp(1.5rem, 3vw, 2rem)",
				fontWeight: 600,
				lineHeight: 1.2,
				margin: "28px 0 6px",
				color: "var(--ink)",
			}}
		>
			{children}
		</h2>
	),
	heading3: ({ children }) => (
		<h3
			style={{
				fontFamily: "var(--font-display)",
				fontSize: "clamp(1.2rem, 2.4vw, 1.5rem)",
				fontWeight: 600,
				lineHeight: 1.25,
				margin: "24px 0 4px",
				color: "var(--ink)",
			}}
		>
			{children}
		</h3>
	),
	paragraph: ({ children }) => (
		<p
			style={{
				fontFamily: "var(--font-body)",
				fontSize: "1rem",
				lineHeight: 1.7,
				margin: "0 0 16px",
				color: "var(--ink)",
			}}
		>
			{children}
		</p>
	),
	hyperlink: ({ children, node }) => (
		<PrismicLink
			field={node.data}
			style={{
				color: "var(--brand-deep)",
				textDecoration: "underline",
				textUnderlineOffset: 2,
				transition: "color 0.2s",
			}}
		>
			{children}
		</PrismicLink>
	),
	listItem: ({ children }) => (
		<li
			style={{
				fontFamily: "var(--font-body)",
				fontSize: "1rem",
				lineHeight: 1.7,
				color: "var(--ink)",
				marginBottom: 4,
			}}
		>
			{children}
		</li>
	),
	oListItem: ({ children }) => (
		<li
			style={{
				fontFamily: "var(--font-body)",
				fontSize: "1rem",
				lineHeight: 1.7,
				color: "var(--ink)",
				marginBottom: 4,
			}}
		>
			{children}
		</li>
	),
};

function BlogTable({ data }: { data: TableData }) {
	return (
		<div className={styles.tableWrap}>
			<table className={styles.table}>
				<thead>
					<tr>
						{data.headers.map((header, i) => (
							<th key={i}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.rows.map((row, i) => (
						<tr key={i}>
							{row.map((cell, j) => (
								<td key={j}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function isTextBlock(block: RTNode): block is RTTextNode {
	return block.type === "paragraph" || block.type === "preformatted";
}

function renderField(field: RichTextField) {
	const blocks: RTNode[] = field ?? [];
	const out: React.ReactNode[] = [];
	let run: RTNode[] = [];

	const flush = (key: string) => {
		if (run.length > 0) {
			out.push(
				<PrismicRichText
					key={key}
					field={run as RichTextField}
					components={richTextComponents}
				/>,
			);
			run = [];
		}
	};

	let i = 0;
	while (i < blocks.length) {
		const block = blocks[i];

		if (
			!isTextBlock(block) ||
			(!block.text.includes("[table]") && !block.text.includes("[/table]"))
		) {
			run.push(block);
			i++;
			continue;
		}

		// Accumulate following text blocks if the closing marker is missing
		// (a table pasted across multiple paragraphs).
		let acc = block.text;
		let endIdx = acc.indexOf("[/table]", acc.indexOf("[table]") + 7);
		let j = i + 1;
		while (endIdx === -1 && j < blocks.length) {
			const next = blocks[j];
			if (isTextBlock(next)) {
				acc += "\n" + next.text;
				endIdx = acc.indexOf("[/table]");
			}
			j++;
		}

		const split = splitTableBlock(acc);
		if (!split.table) {
			run.push(block);
			i++;
			continue;
		}

		flush(`pre-${i}`);
		if (split.before) {
			out.push(
				<PrismicRichText
					key={`before-${i}`}
					field={[paragraphBlock(split.before)]}
					components={richTextComponents}
				/>,
			);
		}
		out.push(<BlogTable key={`table-${i}`} data={split.table} />);
		if (split.after) {
			out.push(
				<PrismicRichText
					key={`after-${i}`}
					field={[paragraphBlock(split.after)]}
					components={richTextComponents}
				/>,
			);
		}
		i = j;
	}
	flush(`post-${i}`);

	return out;
}

export function RichTextBlog({ field }: { field: RichTextField }) {
	return <>{renderField(field)}</>;
}
