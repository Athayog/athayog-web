import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormStatus from "@/components/forms/FormStatus";

describe("FormStatus", () => {
	it("renders nothing until the submission succeeds", () => {
		const { container } = render(
			<FormStatus submitted={false} message="Thank you." />,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders the message once submitted", () => {
		render(<FormStatus submitted title="Message Sent" message="Thank you." />);
		expect(screen.getByText("Message Sent")).toBeInTheDocument();
		expect(screen.getByText("Thank you.")).toBeInTheDocument();
	});

	it("omits the heading for the single-sentence landing page treatment", () => {
		render(<FormStatus submitted message="Thank you." />);
		expect(screen.queryByText("Message Sent")).not.toBeInTheDocument();
		expect(screen.getByText("Thank you.")).toBeInTheDocument();
	});

	it("is not itself a live region, so the toast owns the announcement", () => {
		render(<FormStatus submitted title="Message Sent" message="Thank you." />);
		expect(screen.queryByRole("status")).not.toBeInTheDocument();
	});

	it("can render its title as the page heading, for pages it replaces", () => {
		render(
			<FormStatus
				submitted
				titleAs="h1"
				title="Message Sent"
				message="Thank you."
			/>,
		);
		expect(
			screen.getByRole("heading", { level: 1, name: "Message Sent" }),
		).toBeInTheDocument();
	});
});
