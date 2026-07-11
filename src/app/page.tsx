import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
	title: "Athayog Living — Yoga & Wellness in Indiranagar, Bangalore",
	openGraph: {
		title: "Athayog Living — Yoga & Wellness in Indiranagar, Bangalore",
	},
};

export default function Home() {
	return (
		<section style={{ padding: "88px 0 74px" }}>
			<div className="wrap">
				<Reveal>
					<span className="eyebrow">Wellness &amp; Yoga</span>
					<h2
						style={{
							fontSize: "clamp(2.6rem, 5.6vw, 4.2rem)",
							marginTop: 16,
						}}
					>
						Rooted in Tradition, Designed for Modern Life
					</h2>
					<p className="lead" style={{ maxWidth: 560, marginTop: 16 }}>
						Discover balance through ancient practices adapted for your
						everyday.
					</p>
					<div style={{ display: "flex", gap: 14, marginTop: 28 }}>
						<a href="#" className="btn btn-primary">
							Explore Classes
						</a>
						<a href="#" className="btn btn-ghost">
							Meet the Founder
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
