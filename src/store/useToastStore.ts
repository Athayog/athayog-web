"use client";

import { create } from "zustand";

export type ToastVariant = "success" | "error";

export interface Toast {
	id: number;
	variant: ToastVariant;
	title: string;
	message?: string;
}

interface ToastState {
	toasts: Toast[];
	push: (toast: Omit<Toast, "id">) => void;
	dismiss: (id: number) => void;
}

let nextId = 1;

export const useToastStore = create<ToastState>((set) => ({
	toasts: [],
	push: (toast) =>
		set((state) => ({
			toasts: [...state.toasts, { ...toast, id: nextId++ }],
		})),
	dismiss: (id) =>
		set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
