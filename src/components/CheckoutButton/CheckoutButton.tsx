"use client";

import { useFormStatus } from "react-dom";

export function CheckoutButton({ className }: { className: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? "Redirecting…" : "Checkout"}
    </button>
  );
}
