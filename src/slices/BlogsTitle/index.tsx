import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

const BlogsTitle = ({ slice }: SliceComponentProps<any>) => {
	return (
		<div data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
				<div
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "clamp(2rem, 4.2vw, 2.9rem)",
						fontWeight: 600,
						lineHeight: 1.12,
						color: "var(--ink)",
						marginBottom: 12,
					}}
				>
					<PrismicRichText field={slice.primary.title} />
				</div>
				{slice.primary.subtitle && (
					<p
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "1.3rem",
							color: "var(--brand-deep)",
							lineHeight: 1.4,
							margin: 0,
						}}
					>
						{slice.primary.subtitle}
					</p>
				)}
			</div>
		</div>
	);
};

export default BlogsTitle;
