import Image from "next/image";
import { formatProductPrice } from "@/lib/pricing";

const keyHighlights = [
  {
    label: "Pedidos",
    value: "Atención directa por WhatsApp",
  },
  {
    label: "Servicio",
    value: "Reparto a domicilio",
  },
  {
    label: "Frescura",
    value: "Empacado al Alto Vacío",
  },
];

export default function Hero({
  brandName,
  logo,
  eyebrow,
  title,
  subtitle,
  description,
  mapsUrl,
  locationLabel,
  whatsappDisplay,
  featuredProducts,
}) {
  const [brandStart, ...brandRest] = brandName.split(" ");
  const brandEnd = brandRest.join(" ");

  return (
    <section
      id="inicio"
      className="surface-card relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(161,38,57,0.08),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(194,154,91,0.12),transparent_30%)]" />

      <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="animate-floatUp">
          <p className="eyebrow">{eyebrow}</p>

          {logo?.src ? (
            <div className="mt-3 max-w-[17rem] sm:max-w-[22rem] lg:max-w-[26rem]">
              <Image
                alt={logo.alt}
                className="h-auto w-full object-contain object-left"
                height={logo.height}
                priority
                src={logo.src}
                width={logo.width}
              />
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="font-display text-[3.2rem] leading-none text-carbon sm:text-[4.6rem]">
                {brandStart}
              </span>
              {brandEnd ? (
                <span className="font-display text-[3.2rem] leading-none text-vino-700 sm:text-[4.6rem]">
                  {brandEnd}
                </span>
              ) : null}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="info-pill">{locationLabel}</span>
            <span className="rounded-full border border-vino-100 bg-vino-700 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              WhatsApp {whatsappDisplay}
            </span>
            <span className="info-pill">Reparto a domicilio</span>
          </div>

          <h2 className="mt-6 max-w-3xl font-display text-[2.7rem] font-semibold leading-[0.98] text-carbon sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-vino-700 sm:text-xl">
            {subtitle}
          </p>

          <p className="mt-4 max-w-2xl text-base leading-7 text-carbon/72 sm:text-lg">
            {description}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {keyHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-humo bg-white p-4 shadow-[0_8px_20px_rgba(80,45,31,0.05)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-vino-700">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-carbon">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              className="btn-secondary min-h-14 w-full px-7 text-base sm:w-auto"
              href={mapsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Cómo llegar
            </a>

            <a
              className="btn-ghost min-h-14 w-full px-7 text-base sm:w-auto"
              href="#precios"
            >
              Ver precios
            </a>
          </div>
        </div>

        <div className="animate-floatUp rounded-[30px] border border-humo bg-[linear-gradient(180deg,#fffdf9_0%,#f7ede3_100%)] p-5 shadow-[0_20px_40px_rgba(100,54,34,0.07)] [animation-delay:120ms]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Pedido porcionado</p>
              <h3 className="mt-2 font-display text-3xl text-carbon">
                Pedido listo para tu mesa y tu semana
              </h3>
            </div>
            <span className="rounded-full border border-vino-100 bg-vino-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-vino-700">
              Frescura
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-vino-100 bg-vino-700 p-4 text-white shadow-[0_14px_30px_rgba(122,26,42,0.14)]">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                Selección del día
              </p>
              <p className="mt-2 text-lg font-semibold">
                Carnes seleccionadas, mejor orden y porciones listas para la semana.
              </p>
            </div>

            <div className="rounded-2xl border border-humo bg-white p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-carbon/45">
                Servicio
              </p>
              <p className="mt-2 text-lg font-semibold text-carbon">
                Reparto a domicilio y atención directa por WhatsApp.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {featuredProducts.map((product) => (
              <div
                key={`${product.categoria}-${product.nombre}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-humo bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium text-carbon">{product.nombre}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-carbon/45">
                    {product.categoria}
                  </p>
                </div>
                <span className="rounded-full border border-vino-100 bg-vino-700 px-3 py-1 text-sm font-semibold text-white">
                  {formatProductPrice(product)}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm leading-6 text-carbon/68">
            Carnes seleccionadas del Mercado de Coyoacán para la mesa diaria,
            una comida especial o un pedido porcionado al Alto Vacío.
          </p>
        </div>
      </div>
    </section>
  );
}
