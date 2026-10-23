import { Cog, Droplets, Factory, FlaskConical, Mountain, PawPrint, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrandTrianglesBackground } from "@/components/ui/BrandTrianglesBackground";

interface CategoryApplicationsProps {
  isEs: boolean;
  eyebrow: string;
  productName: string;
  applications: string[];
}

// Ícono y color por sector según el texto de la aplicación (ES o EN).
// "petroquímico" va antes que "químico" porque lo contiene.
const SECTORS: { match: RegExp; Icon: LucideIcon; color: string }[] = [
  // Planta con chimeneas: una refinería, no una bomba de gasolina
  { match: /petroqu|petrochem/i, Icon: Factory, color: "#e5c798" },
  { match: /químic|chemical/i, Icon: FlaskConical, color: "#02aeaa" },
  { match: /agua|water/i, Icon: Droplets, color: "#85b2cf" },
  { match: /animal/i, Icon: PawPrint, color: "#e5c798" },
  { match: /procesamiento de sal|salt processing/i, Icon: Mountain, color: "#85b2cf" },
];
// Industria en general y cualquier sector nuevo
const DEFAULT_SECTOR = { Icon: Cog, color: "#02aeaa" };

// Las tarjetas ocupan todo el ancho sin importar cuántas aplicaciones tenga el producto
const LG_COLUMNS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

// Para usar el nombre dentro de una frase sin tocar la "A" de "tipo A"
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** Sectores que abastece un producto: bloque azul con un ícono grande por sector */
export function CategoryApplications({ isEs, eyebrow, productName, applications }: CategoryApplicationsProps) {
  const count = applications.length;

  return (
    <ScrollReveal animation="fade-up">
      <div className="relative rounded-3xl bg-[#183c6b] text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl">
        <BrandTrianglesBackground layout="together" position="bottom-right" size="lg" opacityClass="opacity-15" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[radial-gradient(closest-side,rgba(2,174,170,0.15),transparent)] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-8 sm:gap-10">
          {/* Encabezado: el nombre del producto recuerda en qué página estamos */}
          <div className="flex flex-col gap-1.5 max-w-3xl">
            <span className="type-eyebrow text-[#02aeaa]">{eyebrow}</span>
            <h2 className="type-h2 text-white">
              {isEs ? "Sectores que abastecemos" : "Industries we supply"}
            </h2>
            <p className="type-body text-white/75">
              {isEs ? "Usos recomendados de la " : "Recommended uses of "}
              <span className="font-bold text-[#02aeaa]">{lowerFirst(productName)}</span>.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${count >= 3 ? "md:grid-cols-3" : ""} ${LG_COLUMNS[Math.min(count, 5)]} gap-4 sm:gap-5`}
          >
            {applications.map((app, idx) => {
              const { Icon, color } = SECTORS.find((s) => s.match.test(app)) ?? DEFAULT_SECTOR;

              return (
                <ScrollReveal key={app} animation="fade-up" delay={idx * 100} className="h-full">
                  <div className="group relative h-full flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden">
                    <span className="absolute top-3 right-4 text-4xl font-black font-heading text-white/10 select-none pointer-events-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: `${color}26`, borderColor: `${color}55` }}
                    >
                      <Icon className="w-8 h-8" style={{ color }} strokeWidth={1.75} />
                    </div>

                    <h3 className="type-h5 text-white leading-snug">{app}</h3>

                    <span
                      className="mt-auto h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
