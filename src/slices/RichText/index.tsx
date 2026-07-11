import type { SliceComponentProps } from "@prismicio/react";
import { RichTextBlog } from "@/components/RichTextBlog";

const RichText = ({ slice }: SliceComponentProps<any>) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<RichTextBlog field={slice.primary.content} />
		</section>
	);
};

export default RichText;
