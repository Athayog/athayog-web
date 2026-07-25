import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Excursions & Picnics | Athayog Living",
	description:
		"Reconnect with nature on Athayog's yoga excursions and picnics near Bangalore. Outdoor yoga, meditation, adventure and community — day-long and weekend getaways.",
	alternates: { canonical: "https://athayogliving.com/picnics" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
