import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { FormField } from "../FormField";
import { zodField } from "@/lib/forms/validate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderWithForm(children: (form: any) => React.ReactNode) {
	function Wrapper() {
		const form = useForm({
			defaultValues: {
				name: "",
				email: "",
				message: "",
				service: "",
				resume: null as File | null,
			},
		});
		return <>{children(form)}</>;
	}
	return render(<Wrapper />);
}

describe("FormField", () => {
	it("renders label and text input", () => {
		renderWithForm((form) => <FormField form={form} name="name" label="Full Name" />);
		const input = screen.getByLabelText("Full Name");
		expect(input).toBeInTheDocument();
		expect(input.tagName).toBe("INPUT");
	});

	it("renders email input with correct type", () => {
		renderWithForm((form) => (
			<FormField form={form} name="email" label="Email" type="email" />
		));
		const input = screen.getByLabelText("Email");
		expect(input).toHaveAttribute("type", "email");
	});

	it("renders textarea", () => {
		renderWithForm((form) => (
			<FormField form={form} name="message" label="Message" as="textarea" />
		));
		const textarea = screen.getByLabelText("Message");
		expect(textarea.tagName).toBe("TEXTAREA");
	});

	it("renders select with options", () => {
		renderWithForm((form) => (
			<FormField
				form={form}
				name="service"
				label="Service"
				as="select"
				placeholder="Pick one"
				options={[
					{ value: "a", label: "Option A" },
					{ value: "b", label: "Option B" },
				]}
			/>
		));
		const select = screen.getByLabelText("Service");
		expect(select.tagName).toBe("SELECT");
		expect(screen.getByText("Option A")).toBeInTheDocument();
		expect(screen.getByText("Option B")).toBeInTheDocument();
	});

	it("displays hint text", () => {
		renderWithForm((form) => (
			<FormField form={form} name="name" label="Name" hint="Enter your full name" />
		));
		expect(screen.getByText("Enter your full name")).toBeInTheDocument();
	});

	it("renders file input with accept", () => {
		renderWithForm((form) => (
			<FormField form={form} name="resume" label="Resume" as="file" accept=".pdf" />
		));
		const fileInput = screen.getByLabelText("Resume");
		expect(fileInput.tagName).toBe("INPUT");
		expect(fileInput).toHaveAttribute("type", "file");
		expect(fileInput).toHaveAttribute("accept", ".pdf");
	});

	it("shows error on validation failure", async () => {
		function ErrorForm() {
			const form = useForm({
				defaultValues: { test: "" },
			});

			return (
				<>
					<FormField
						form={form}
						name="test"
						label="Test"
						validators={{
							onChange: zodField(z.string().min(3, "Too short")),
						}}
					/>
					<button type="button" onClick={() => form.handleSubmit()}>
						Submit
					</button>
				</>
			);
		}
		render(<ErrorForm />);
		const user = userEvent.setup();
		await user.click(screen.getByRole("button"));
		expect(screen.getByText("Too short")).toBeInTheDocument();
	});
});
