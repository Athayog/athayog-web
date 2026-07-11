import type { RichTextField } from "@prismicio/client";
import type { JSXMapSerializer } from "@prismicio/react";
import { PrismicRichText, PrismicLink } from "@prismicio/react";

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

export function RichTextBlog({ field }: { field: RichTextField }) {
	return <PrismicRichText field={field} components={richTextComponents} />;
}
