import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
  Trees,
} from "lucide-react";
import type { Locale } from "@/dictionaries/get-dictionary";

interface AboutContentProps {
  currentLang: Locale;
}

export function AboutContent({ currentLang }: AboutContentProps) {
  const isEs = currentLang === "es";

  const historyMilestones = [
    {
      year: "1989",
      title: isEs ? "Fundación en Maracaibo" : "Foundation in Maracaibo",
      desc: isEs
        ? "Creada por el Grupo Zuliano como iniciativa estratégica para el desarrollo salinero en el occidente del país."
        : "Founded by Grupo Zuliano as a strategic venture for salt production in western Venezuela.",
    },
    {
      year: "1999",
      title: isEs ? "Puesta en marcha 'Green Field'" : "'Green Field' launch",
      desc: isEs
        ? "Construido entre 1994 y 1998, el Complejo Industrial Los Olivitos inicia operaciones comerciales en marzo de 1999."
        : "Built between 1994 and 1998, the Los Olivitos Industrial Complex began commercial operations in March 1999.",
    },
  ];

  const sustainabilityItems = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#02aeaa]" />,
      title: isEs ? "Zona ABRAE" : "ABRAE zone",
      desc: isEs
        ? "Nuestra salina forma parte de un Área Bajo Régimen de Administración Especial, que protege el ecosistema costero y sus humedales."
        : "Our saltworks are part of an Area Under Special Administration Regime, which protects the coastal ecosystem and its wetlands.",
    },
    {
      icon: <Trees className="w-6 h-6 text-[#85b2cf]" />,
      title: isEs ? "Sitio RHRAP y jardín Los Yabos" : "WHSRN site and Los Yabos garden",
      desc: isEs
        ? "Los Olivitos fue el primer sitio de Venezuela reconocido por la Red Hemisférica de Reservas de Aves Playeras (RHRAP) por su importancia para las aves migratorias. En el mismo entorno se encuentra el jardín xerofítico Los Yabos, que conserva la flora de la zona."
        : "Los Olivitos was the first site in Venezuela recognized by the Western Hemisphere Shorebird Reserve Network (WHSRN) for its importance to migratory birds. The same area is home to the Los Yabos xerophytic garden, which preserves the local flora.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#e5c798]" />,
      title: isEs ? "Programa RSE: Nutriendo la Prosperidad" : "CSR program: Nutriendo la Prosperidad",
      desc: isEs
        ? "Programa de responsabilidad social desarrollado en alianza con el Dividendo Voluntario para la Comunidad (DVC), orientado a la nutrición de niños en edad preescolar de comunidades zulianas."
        : "Social responsibility program developed in partnership with Dividendo Voluntario para la Comunidad (DVC), focused on the nutrition of preschool children in Zulia communities.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 sm:gap-24">
      {/* 2. Grid panorámico e historia corporativa */}
      <ScrollReveal animation="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-16/10">
          <Image
            src="/images/produsal-salina-horizonte.webp"
            alt={isEs ? "Salina Los Olivitos de Produsal, Zulia, Venezuela" : "Produsal Los Olivitos saltworks, Zulia, Venezuela"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#183c6b]/90 via-[#183c6b]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="type-label text-[#e5c798] block mb-1">
              {isEs ? "5.400 hectáreas propias" : "5,400 proprietary hectares"}
            </span>
            <p className="text-base sm:text-lg font-bold">
              {isEs
                ? "Complejo 'Green Field' Los Olivitos, municipio Miranda, Zulia"
                : "Los Olivitos 'Green Field' complex, Miranda Municipality, Zulia"}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="type-h2 text-[#183c6b]">
            {isEs ? "Nuestra trayectoria" : "Our heritage"}
          </h2>
          <p className="type-body text-slate-600">
            {isEs
              ? "Desde su concepción en Maracaibo hasta convertirse en la principal salina del país, PRODUSAL ha desarrollado una infraestructura industrial con tecnología de cristalización solar."
              : "From its roots in Maracaibo to operating the country's leading saltworks, PRODUSAL has built industrial infrastructure with solar crystallization technology."}
          </p>

          <div className="flex flex-col gap-4">
            {historyMilestones.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="px-2.5 py-1 rounded-md bg-[#02aeaa] text-white font-bold text-xs shrink-0">
                  {item.year}
                </span>
                <div>
                  <h4 className="type-h5 text-[#183c6b] mb-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 3. Capacidad: una sola cifra, junto al encabezado */}
      <ScrollReveal animation="fade-up" className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
        <div className="md:col-span-7">
          <span className="type-eyebrow text-[#02aeaa] block mb-2">
            {isEs ? "Capacidad y logística" : "Capacity and logistics"}
          </span>
          <h2 className="type-h2 text-[#183c6b]">
            {isEs ? "Cifras que respaldan nuestro liderazgo" : "Figures behind our leadership"}
          </h2>
        </div>

        <div className="md:col-span-5 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#02aeaa] transition-all">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#183c6b] font-heading tracking-tight">
              650.000
            </span>
            <span className="text-xs font-bold text-[#02aeaa]">{isEs ? "TM / año" : "MT / year"}</span>
          </div>
          <h4 className="type-h5 text-slate-900 mb-1">{isEs ? "Capacidad" : "Capacity"}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isEs ? "La principal salina de Venezuela." : "Venezuela's leading saltworks."}
          </p>
        </div>
      </ScrollReveal>

      {/* 4. Sustentabilidad, ecosistema y RSE */}
      <ScrollReveal animation="fade-up" className="flex flex-col gap-8">
        <div>
          <span className="type-eyebrow text-[#02aeaa] block mb-2">
            {isEs ? "Compromiso ambiental y social" : "Environmental and social commitment"}
          </span>
          <h2 className="type-h2 text-[#183c6b]">
            {isEs ? "Armonía entre industria y naturaleza" : "Harmony between industry and nature"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sustainabilityItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#02aeaa]/40 hover:bg-white hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="type-h5 text-[#183c6b] mb-2 group-hover:text-[#02aeaa] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 5. Nuestro equipo humano */}
      <ScrollReveal animation="fade-up" className="flex flex-col gap-8">
        <div>
          <span className="type-eyebrow text-[#02aeaa] block mb-2">
            {isEs ? "Nuestra gente" : "Our people"}
          </span>
          <h2 className="type-h2 text-[#183c6b]">
            {isEs ? "El equipo que impulsa la industria salinera" : "The team driving the salt industry"}
          </h2>
          <p className="type-body text-slate-600 max-w-3xl mt-2">
            {isEs
              ? "Más de 20 años de experiencia respaldados por un equipo multidisciplinario que trabaja día a día en Los Olivitos."
              : "Over 20 years of experience backed by a multidisciplinary team working every day at Los Olivitos."}
          </p>
        </div>

        {/* Foto del equipo (pendiente: reemplazar por un collage sin caras) */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-16/9 sm:aspect-21/9 bg-slate-900 group">
          <Image
            src="/images/produsal-equipo-humano.webp"
            alt={isEs ? "Equipo de trabajo de PRODUSAL en Los Olivitos" : "PRODUSAL team at Los Olivitos"}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#183c6b]/90 via-[#183c6b]/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="type-label text-[#e5c798] block mb-1">
                Los Olivitos, Zulia
              </span>
              <p className="text-base sm:text-lg font-bold">
                {isEs
                  ? "Compromiso humano y seguridad industrial"
                  : "Human commitment and workplace safety"}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold font-heading shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#02aeaa] animate-pulse" />
              {isEs ? "100% talento venezolano" : "100% Venezuelan talent"}
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* 6. Llamado a la acción */}
      <ScrollReveal animation="fade-up" className="p-8 sm:p-12 rounded-3xl bg-[#183c6b] text-white border border-[#02aeaa]/30 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="max-w-2xl text-left">
          <h3 className="type-h3 mb-2">
            {isEs ? "¿Deseas solicitar especificaciones o cotización de sal al mayor?" : "Need specifications or wholesale salt pricing?"}
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            {isEs
              ? "Atendemos despachos en sacos, big bags y a granel directamente desde nuestra planta en Los Olivitos."
              : "We fulfill shipments in bags, big bags, and bulk directly from our plant at Los Olivitos."}
          </p>
        </div>

        <Link
          href={`/${currentLang}/contacto`}
          className="px-8 py-4 rounded-xl bg-white text-[#183c6b] hover:bg-slate-100 font-bold text-sm shadow-md transition-all shrink-0 inline-flex items-center gap-2 group"
        >
          <span>{isEs ? "Contáctanos" : "Contact us"}</span>
          <ArrowRight className="w-4 h-4 text-[#02aeaa] group-hover:translate-x-1 transition-transform" />
        </Link>
      </ScrollReveal>
    </div>
  );
}
