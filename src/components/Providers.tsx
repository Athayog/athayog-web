"use client";

import { ProgressProvider } from "@bprogress/next/app";
import ToastRegion from "@/components/ToastRegion";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ProgressProvider
			height="3px"
			color="var(--brand)"
			options={{ showSpinner: false }}
			shallowRouting
		>
			{children}
			<ToastRegion />
		</ProgressProvider>
	);
}
