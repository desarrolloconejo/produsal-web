import type { LucideProps } from "lucide-react";

// Cabeza de vaca con el mismo trazo de Lucide (Lucide no tiene una)
export function CowIcon(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 6C6.5 5.5 5.5 4 5.5 2.5" />
      <path d="M16 6c1.5-.5 2.5-2 2.5-3.5" />
      <path d="M7.2 8.5C5.5 8.8 3.8 8.2 2.5 7c.6 2 2.2 3.6 4.7 3.8" />
      <path d="M16.8 8.5c1.7.3 3.4-.3 4.7-1.5-.6 2-2.2 3.6-4.7 3.8" />
      <path d="M8 15 7 10c-.2-1.6.2-3 1-4h8c.8 1 1.2 2.4 1 4l-1 5" />
      <rect x="7" y="15" width="10" height="7" rx="3.5" />
      <path d="M10.5 18.5h.01" />
      <path d="M13.5 18.5h.01" />
      <path d="M10 11h.01" />
      <path d="M14 11h.01" />
    </svg>
  );
}
