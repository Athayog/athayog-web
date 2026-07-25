import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Request Account Deletion | AthaYog Living",
	description:
		"Submit a request to delete your AthaYog Living account and associated data.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
