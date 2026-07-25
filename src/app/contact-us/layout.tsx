import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Athayog Living | Yoga Studio in Indiranagar, Bangalore",
	description:
		"Get in touch with Athayog Living, a certified yoga studio in Indiranagar. Visit our HAL 2nd Stage studio, call +91 8690333111, or send us a message online. We'd love to hear from you.",
	alternates: { canonical: "https://athayogliving.com/contact-us" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
