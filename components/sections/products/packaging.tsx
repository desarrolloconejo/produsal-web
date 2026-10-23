import { Layers, Truck, type LucideProps } from "lucide-react";
import type { Dictionary } from "@/dictionaries/get-dictionary";

type Item = Dictionary["products"]["categories"][number]["items"][number];

export type PackagingKind = "bulk" | "bigBag" | "bag";

/** Saco amarrado, dibujado con el mismo trazo de Lucide (Lucide no trae un ícono de saco) */
export function SackIcon({ className, strokeWidth = 2, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M9 3h6l-1.5 3.5h-3z" />
      <path d="M10.5 6.5C6.5 8.5 4.5 12.5 4.5 16c0 3 2.5 5 7.5 5s7.5-2 7.5-5c0-3.5-2-7.5-6-9.5" />
      <path d="M9.5 6.5h5" />
    </svg>
  );
}

/** Tipo de presentación según el formato: define el ícono y el color en toda la web */
export function packagingKind(item: Pick<Item, "format">): PackagingKind {
  const format = item.format.toLowerCase();
  if (format.includes("big bag")) return "bigBag";
  if (format.includes("granel") || format.includes("bulk")) return "bulk";
  return "bag";
}

export const PACKAGING_STYLES = {
  bulk: {
    Icon: Truck,
    iconColor: "text-[#02aeaa]",
    className: "bg-[#02aeaa]/15 border-[#02aeaa]/30",
  },
  bigBag: {
    Icon: Layers,
    iconColor: "text-[#e5c798]",
    className: "bg-[#e5c798]/25 border-[#e5c798]/40",
  },
  bag: {
    Icon: SackIcon,
    iconColor: "text-[#85b2cf]",
    className: "bg-[#85b2cf]/20 border-[#85b2cf]/40",
  },
} satisfies Record<PackagingKind, { Icon: React.ComponentType<LucideProps>; iconColor: string; className: string }>;
