import { notFound } from "next/navigation";

// Cualquier ruta desconocida bajo /es o /en muestra el 404 localizado (con header y footer)
export default function CatchAllPage() {
  notFound();
}
