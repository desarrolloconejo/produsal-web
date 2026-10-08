import LocalizedNotFound from "./[lang]/not-found";

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Mismo 404 que dentro de [lang]: toma el idioma de la URL */}
      <LocalizedNotFound />
    </div>
  );
}
