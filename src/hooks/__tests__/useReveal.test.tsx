import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useReveal } from "@/hooks/useReveal";

function TestComp({ threshold = 0.12 }: { threshold?: number }) {
	const { ref, inView } = useReveal<HTMLDivElement>(threshold);
	return <div ref={ref} data-testid="target" data-inview={inView} />;
}

describe("useReveal", () => {
	let intersectionCallback: ((entries: { isIntersecting: boolean }[]) => void) | null;
	let mockObserve: ReturnType<typeof vi.fn>;
	let mockUnobserve: ReturnType<typeof vi.fn>;
	let mockDisconnect: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		mockObserve = vi.fn();
		mockUnobserve = vi.fn();
		mockDisconnect = vi.fn();
		intersectionCallback = null;

		class MockObserver {
			observe = mockObserve;
			unobserve = mockUnobserve;
			disconnect = mockDisconnect;

			constructor(callback: typeof intersectionCallback) {
				intersectionCallback = callback;
			}
		}

		Object.defineProperty(global, "IntersectionObserver", {
			value: MockObserver,
			writable: true,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("initializes with inView as false", () => {
		render(<TestComp />);
		const el = screen.getByTestId("target");
		expect(el).toHaveAttribute("data-inview", "false");
	});

	it("calls observer.observe after requestAnimationFrame", () => {
		render(<TestComp />);
		expect(mockObserve).not.toHaveBeenCalled();
		vi.runAllTimers();
		expect(mockObserve).toHaveBeenCalled();
	});

	it("sets inView to true when element is intersecting", () => {
		render(<TestComp />);
		vi.runAllTimers();

		expect(intersectionCallback).not.toBeNull();
		act(() => {
			intersectionCallback!([{ isIntersecting: true }]);
		});

		const el = screen.getByTestId("target");
		expect(el).toHaveAttribute("data-inview", "true");
	});

	it("calls unobserve after intersection", () => {
		render(<TestComp />);
		vi.runAllTimers();

		act(() => {
			intersectionCallback!([{ isIntersecting: true }]);
		});

		expect(mockUnobserve).toHaveBeenCalled();
	});

	it("disconnects observer on unmount", () => {
		const { unmount } = render(<TestComp />);
		vi.runAllTimers();

		unmount();
		expect(mockDisconnect).toHaveBeenCalled();
	});
});
