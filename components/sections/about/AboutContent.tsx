import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sun,
  Droplets,
  ArrowRight,
  Award,
  CheckCircle,
  Factory,
  Layers,
  HeartHandshake,
  Trees,
  Calendar,
  Building2,
  TrendingUp,
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
        ? "Creada por el Grupo Zuliano como iniciativa estratégica para el desarrollo industrial salinero en el occidente del país."
        : "Founded by Grupo Zuliano as a strategic venture to pioneer industrial sea salt production in western Venezuela.",
    },
    {
      year: "1999",
      title: isEs ? "Puesta en Marcha 'Green Field'" : "'Green Field' Commercial Launch",
      desc: isEs
        ? "Construido entre 1994 y 1998, el Complejo Industrial Los Olivitos inicia operaciones comerciales continuas en marzo de 1999."
        : "Built between 1994 and 1998, the Los Olivitos Industrial Complex began continuous commercial operations in March 1999.",
    },
  ];

  const operationalStats = [
    {
      value: "800.000",
      unit: isEs ? "TM / Año" : "MT / Year",
      label: isEs ? "Capacidad Instalada Total" : "Total Installed Capacity",
      desc: isEs
        ? "Potencial de diseño industrial de cosecha marina solar en Los Olivitos."
        : "Full industrial engineering design potential at Los Olivitos solar flats.",
    },
    {
      value: "650.000",
      unit: isEs ? "TM / Año" : "MT / Year",
      label: isEs ? "Capacidad Operativa Actual" : "Current Operational Output",
      desc: isEs
        ? "La mayor salina de Venezuela operando bajo altos estándares de eficiencia."
        : "Venezuela's largest operating sea salt facility with world-class efficiency.",
    },
    {
      value: "450.000",
      unit: isEs ? "TM" : "MT",
      label: isEs ? "Almacenaje en Patio" : "Stockpile Yard Capacity",
      desc: isEs
        ? "Respaldo continuo de inventario para asegurar despachos ininterrumpidos."
        : "Continuous stockpile buffer ensuring uninterrupted supply year-round.",
    },
    {
      value: "60.000",
      unit: isEs ? "TM / Año" : "MT / Year",
      label: isEs ? "Planta de Molienda y Empacado" : "Milling & Packaging Plant",
      desc: isEs
        ? "Procesamiento de sal molida Premium y Tipo A en sacos de 20 Kg y Big Bags."
        : "High-spec processing for Premium & Grade A milled salt in 20 Kg and Big Bags.",
    },
  ];

  const marketSegments = [
    {
      percent: "37%",
      title: isEs ? "Consumo Humano e Industria Alimentaria" : "Human Consumption & Food Manufacturing",
      desc: isEs
        ? "Sal refinada y de mesa, materia prima para refinerías, procesadoras de embutidos, panificación, lácteos y consumo masivo."
        : "Table salt, refined crystals, and food-grade ingredients for industrial processors, baking, dairy, and consumer packaged goods.",
    },
    {
      percent: "35%",
      title: isEs ? "Nutrición Animal y Ganadería (ABA)" : "Animal Nutrition & Livestock Feed (ABA)",
      desc: isEs
        ? "Insumo indispensable para Alimentos Balanceados para Animales (ABA), bloques nutricionales y sales minerales para el rebaño nacional."
        : "Essential mineral base for livestock feed formulations (ABA), mineral lick blocks, and nutritional supplements for agriculture.",
    },
    {
      percent: "28%",
      title: isEs ? "Sector Industrial, Petroquímica y Aguas" : "Industrial, Petrochemical & Water Treatment",
      desc: isEs
        ? "Suministro directo a Pequiven, PDVSA y acueductos para síntesis de cloro gas, ácido clorhídrico (HCl), soda cáustica, PVC y fluidos de perforación."
        : "Direct supply to Pequiven, PDVSA, and municipal utilities for chlorine gas, hydrochloric acid (HCl), caustic soda, PVC, and drilling fluids.",
    },
  ];

  const sustainabilityItems = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#02afab]" />,
      title: isEs ? "Zona ABRAE Bajo Manejo Especial" : "ABRAE Protected Ecological Zone",
      desc: isEs
        ? "Nuestras 5.400 hectáreas forman parte de un Área Bajo Régimen de Administración Especial, garantizando la preservación del ecosistema marino y costero."
        : "Our 5,400 proprietary hectares are integrated into an Area Under Special Administrative Regime, ensuring strict coastal and wetland stewardship.",
    },
    {
      icon: <Trees className="w-6 h-6 text-[#94c11e]" />,
      title: isEs ? "Sitio Internacional RHRAP y Jardín Los Yabos" : "WHSRN International Site & Los Yabos Reserve",
      desc: isEs
        ? "Primer enclave en Venezuela proclamado de Importancia Internacional por la Red Hemisférica de Reservas de Aves Playeras (RHRAP) y hogar del jardín xerofítico 'Los Yabos'."
        : "First site in Venezuela recognized by the Western Hemisphere Shorebird Reserve Network (WHSRN) and habitat to 'Los Yabos' xerophytic botanical sanctuary.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#082846]" />,
      title: isEs ? "Programa RSE: Nutriendo La Prosperidad" : "CSR Initiative: Nutriendo La Prosperidad",
      desc: isEs
        ? "En alianza con el Dividendo Voluntario para la Comunidad (DVC), hemos servido más de 840.000 raciones nutricionales a niños preescolares de comunidades zulianas."
        : "In partnership with Dividendo Voluntario para la Comunidad (DVC), we have provided over 840,000 daily nutritional meals to preschool children in Zulia communities.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 sm:gap-24">
      {/* 1. Encabezado Principal y Visión General con Fotografía a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Columna Izquierda: Título y Visión Editorial */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02afab]/10 text-[#02afab] text-xs font-bold uppercase tracking-wider mb-4 w-fit">
            <Award className="w-3.5 h-3.5" />
            <span>{isEs ? "Complejo Industrial Los Olivitos • Estado Zulia" : "Los Olivitos Industrial Complex • Zulia State"}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#082846] tracking-tight leading-[1.15] mb-5">
            {isEs
              ? "La mayor productora de sal marina de alta pureza en Venezuela"
              : "Venezuela's premier producer of high-purity solar sea salt"}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
            {isEs
              ? "PRODUSAL (Productora de Sal C.A.) es el pilar de la industria salinera venezolana. Aportamos el 65% de la producción nacional de sal marina desde nuestro complejo en Los Olivitos, combinando energía solar limpia con estándares de calidad de clase mundial."
              : "PRODUSAL (Productora de Sal C.A.) is the cornerstone of the Venezuelan salt industry, supplying 65% of the country's sea salt from Los Olivitos through clean solar evaporation and world-class manufacturing standards."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#082846] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#02afab]" />
              {isEs ? "650.000 TM / año operativas" : "650,000 MT / year operative"}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-[#082846] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#94c11e]" />
              {isEs ? "5.400 Ha Reserva ABRAE" : "5,400 Ha ABRAE Reserve"}
            </span>
          </div>
        </div>

        {/* Columna Derecha: Nueva Fotografía Industrial de las Salinas Los Olivitos */}
        <div className="lg:col-span-5 relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 group">
          <Image
            src="/images/produsal-piramides-cielo.webp"
            alt="Estanques de cristalización solar y acopio de sal marina en Los Olivitos Produsal"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082846]/85 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-bold text-[#94c11e] uppercase tracking-wider block font-heading">
              {isEs ? "Cosecha Solar Marina" : "Solar Marine Harvest"}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white/95">
              {isEs ? "Cristalización continua en Los Olivitos, Zulia" : "Continuous crystallization at Los Olivitos, Zulia"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Grid Panorámico e Historia Corporativa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-16/10">
          <Image
            src="/images/produsal-salina-horizonte.webp"
            alt="Salinas Los Olivitos Produsal Zulia Venezuela"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082846]/90 via-[#082846]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs uppercase font-bold tracking-wider text-[#94c11e] block mb-1">
              {isEs ? "5.400 Hectáreas Propias • 3.200 Ha Operativas" : "5,400 Proprietary Hectares • 3,200 Operational Ha"}
            </span>
            <p className="text-base sm:text-lg font-bold">
              {isEs
                ? "Complejo 'Green Field' Los Olivitos, Municipio Miranda, Zulia"
                : "Los Olivitos 'Green Field' Industrial Complex, Miranda, Zulia"}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082846] tracking-tight">
            {isEs ? "Nuestra Trayectoria" : "Our Heritage"}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isEs
              ? "Desde su concepción en Maracaibo hasta convertirse en la salina más grande del país, PRODUSAL ha desarrollado una infraestructura industrial única con dos líneas de lavado de 300 TM/hr y tecnología de cristalización solar continua."
              : "From our roots in Maracaibo to operating the nation's largest salt harvest facility, PRODUSAL has built specialized industrial capacity featuring two 300 MT/hr washing lines and continuous solar crystallization."}
          </p>

          <div className="flex flex-col gap-4">
            {historyMilestones.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="px-2.5 py-1 rounded-md bg-[#02afab] text-white font-bold text-xs shrink-0">
                  {item.year}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#082846] mb-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Métricas Industriales y Capacidad Operativa */}
      <div className="flex flex-col gap-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#02afab] block mb-2">
            {isEs ? "Capacidad y Logística" : "Capacity & Logistics"}
          </span>
          <h2 className="text-3xl font-extrabold text-[#082846] tracking-tight">
            {isEs ? "Cifras que Respaldan Nuestro Liderazgo" : "Key Figures Backing Our Leadership"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {operationalStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#02afab] transition-all"
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#082846] font-heading tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-[#02afab]">{stat.unit}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{stat.label}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Segmentación del Mercado Venezolano */}
      <div className="rounded-3xl p-8 sm:p-12 bg-[#082846] text-white relative overflow-hidden">
        <div className="absolute inset-0 crystal-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#94c11e] block mb-2">
              {isEs ? "Presencia en el Mercado Nacional" : "Domestic Market Leadership"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              {isEs ? "Sectores que Abastece PRODUSAL" : "Sectors Supplied by PRODUSAL"}
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {isEs
                ? "El 88% de la sal producida en Venezuela proviene del Estado Zulia, y el 65% de ese volumen es generado por PRODUSAL. Abastecemos de forma estratégica a tres grandes segmentos económicos:"
                : "88% of Venezuela's sea salt production originates in Zulia state, with 65% produced directly by PRODUSAL. We strategically supply three primary economic sectors:"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketSegments.map((seg, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/10 border border-white/15 hover:border-[#02afab]/60 transition-all backdrop-blur-sm"
              >
                <div className="text-3xl font-extrabold text-[#94c11e] font-heading mb-2">
                  {seg.percent}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">{seg.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{seg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Sustentabilidad, Ecosistema y RSE */}
      <div className="flex flex-col gap-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#02afab] block mb-2">
            {isEs ? "Compromiso Ambiental y Social" : "Environmental & Social Responsibility"}
          </span>
          <h2 className="text-3xl font-extrabold text-[#082846] tracking-tight">
            {isEs ? "Armonía entre Industria y Naturaleza" : "Harmony Between Industry and Nature"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sustainabilityItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#02afab]/40 hover:bg-white hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-[#082846] mb-2 group-hover:text-[#02afab] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Nuestro Equipo Humano y Operación en Campo */}
      <div className="flex flex-col gap-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#02afab] block mb-2 font-heading">
            {isEs ? "Nuestro Talento y Gente" : "Our People & Workforce"}
          </span>
          <h2 className="text-3xl font-extrabold text-[#082846] tracking-tight font-heading">
            {isEs ? "El Equipo que Impulsa la Industria Salinera" : "The Team Driving the Venezuelan Salt Industry"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mt-2">
            {isEs
              ? "Más de 35 años de experiencia técnica respaldada por un equipo multidisciplinario de ingenieros químicos, mecánicos, supervisores de campo y operadores certificados que trabajan día a día en Los Olivitos."
              : "Over 35 years of industrial salt expertise delivered by a multidisciplinary team of chemical engineers, plant technicians, field supervisors, and certified operators working daily at Los Olivitos."}
          </p>
        </div>

        {/* Fotografía Panorámica del Equipo Completo PRODUSAL */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-16/9 sm:aspect-21/9 bg-slate-900 group">
          <Image
            src="/images/produsal-equipo-humano.webp"
            alt="Equipo de trabajo y profesionales de PRODUSAL en el monumento Los Olivitos"
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082846]/90 via-[#082846]/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#94c11e] block mb-1 font-heading">
                {isEs ? "Familia PRODUSAL • Los Olivitos, Zulia" : "PRODUSAL Family • Los Olivitos, Zulia"}
              </span>
              <p className="text-base sm:text-lg font-bold">
                {isEs
                  ? "Compromiso humano, seguridad industrial y vocación de excelencia"
                  : "Human commitment, workplace safety, and pursuit of operational excellence"}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold font-heading shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#02afab] animate-pulse" />
              {isEs ? "100% Talento Venezolano" : "100% Venezuelan Talent"}
            </span>
          </div>
        </div>

        {/* 3 Bloques Operativos con Fotos Reales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm flex flex-col group hover:shadow-md transition-all">
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
              <Image
                src="/images/produsal-envasado-operadores.webp"
                alt="Operadores en planta envasando sal marina Produsal"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-[#02afab] uppercase font-heading">
                {isEs ? "Envasado & Empaque" : "Packaging & Bagging"}
              </span>
              <h4 className="text-base font-bold text-[#082846] leading-snug">
                {isEs ? "Control Riguroso en Cada Saco" : "Rigorous Quality on Every Bag"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs
                  ? "Operadores equipados con protección integral asegurando llenado y sellado de alta resistencia en sacos de 20 kg."
                  : "Fully equipped operators ensuring precise filling and heavy-duty sealing of 20 kg bags."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm flex flex-col group hover:shadow-md transition-all">
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
              <Image
                src="/images/produsal-despacho-granel.webp"
                alt="Carga de gandola tolva a granel con cargador pesado"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-[#02afab] uppercase font-heading">
                {isEs ? "Despacho a Granel" : "Bulk Freight Dispatch"}
              </span>
              <h4 className="text-base font-bold text-[#082846] leading-snug">
                {isEs ? "Carga Rápida de Tolvas y Gandolas" : "Rapid Loading of Bulk Trailers"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs
                  ? "Capacidad de movilización de hasta 650.000 TM/año con maquinaria pesada dedicada en patio de acopio."
                  : "Handling capacity up to 650,000 MT/year with dedicated heavy machinery on stockpiling yards."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm flex flex-col group hover:shadow-md transition-all">
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
              <Image
                src="/images/produsal-atardecer-reflejo.webp"
                alt="Reflejo del atardecer en los canales de la salina"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-[#02afab] uppercase font-heading">
                {isEs ? "Entorno Los Olivitos" : "Los Olivitos Environment"}
              </span>
              <h4 className="text-base font-bold text-[#082846] leading-snug">
                {isEs ? "Sustentabilidad y Energía Solar" : "Sustainability & Solar Energy"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEs
                  ? "Operación limpia en coexistencia armónica con la biodiversidad y el refugio de fauna silvestre."
                  : "Clean solar operation coexisting harmoniously with coastal biodiversity and wildlife reserve."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Llamado a la Acción Transaccional */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#02afab] to-[#008784] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="max-w-2xl text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {isEs ? "¿Deseas solicitar especificaciones o cotización de sal al mayor?" : "Need technical specifications or wholesale salt pricing?"}
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            {isEs
              ? "Atendemos despachos en sacos de 20 Kg, Big Bags de 1 TM y despachos a granel directamente desde nuestro patio de acopio en Los Olivitos."
              : "We fulfill shipments in 20 Kg bags, 1 MT Big Bags, and bulk freight directly from our Los Olivitos stockpiling terminal."}
          </p>
        </div>

        <Link
          href={`/${currentLang}#contacto`}
          className="px-8 py-4 rounded-xl bg-white text-[#082846] hover:bg-slate-100 font-bold text-sm shadow-md transition-all shrink-0 inline-flex items-center gap-2 group"
        >
          <span>{isEs ? "Contáctanos" : "Contact Us"}</span>
          <ArrowRight className="w-4 h-4 text-[#02afab] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
