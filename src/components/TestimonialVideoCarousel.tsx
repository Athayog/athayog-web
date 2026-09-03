"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { TestimonialVideo } from "@/constants/testimonialVideos";
import styles from "@/components/TestimonialVideoCarousel.module.css";

interface TestimonialVideoCarouselProps {
	videos: TestimonialVideo[];
}

export default function TestimonialVideoCarousel({
	videos,
}: TestimonialVideoCarouselProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const [playingId, setPlayingId] = useState<string | null>(null);

	function scroll(direction: -1 | 1) {
		const track = trackRef.current;
		if (!track) return;

		track.scrollBy({
			left: direction * track.clientWidth * 0.82,
			behavior: "smooth",
		});
	}

	return (
		<div className={styles.carousel} aria-label="Member video testimonials">
			<div className={styles.controls}>
				<button
					type="button"
					className={styles.arrow}
					onClick={() => scroll(-1)}
					aria-label="Show previous testimonials"
				>
					<ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
				</button>
				<button
					type="button"
					className={styles.arrow}
					onClick={() => scroll(1)}
					aria-label="Show next testimonials"
				>
					<ChevronRight size={22} strokeWidth={1.8} aria-hidden="true" />
				</button>
			</div>
			<div className={styles.track} ref={trackRef}>
				{videos.map((video) => (
					<div className={styles.card} key={video.id}>
						{playingId === video.id ? (
							<video
								className={styles.video}
								controls
								autoPlay
								playsInline
								preload="metadata"
								poster={video.poster}
							>
								<source src={video.src} type="video/mp4" />
								Your browser does not support HTML video.
							</video>
						) : (
							<button
								type="button"
								className={styles.posterButton}
								onClick={() => setPlayingId(video.id)}
								aria-label={`Play ${video.alt}`}
							>
								<Image
									src={video.poster}
									alt={video.alt}
									fill
									sizes="(max-width: 640px) 78vw, 250px"
									unoptimized
								/>
								<span className={styles.play} aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="currentColor">
										<path d="M8 5v14l11-7z" />
									</svg>
								</span>
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
