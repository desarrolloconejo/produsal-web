import { StatusCard } from "@/components/sections/status/StatusCard";

export default function NotFound() {
  return (
    <StatusCard
      badge="Error 404"
      title="La página que estás buscando no existe."
      description="El enlace puede estar desactualizado o haber sido modificado en el nuevo portal."
      buttonText="Volver al inicio"
      currentLang="es"
      type="404"
    />
  );
}
