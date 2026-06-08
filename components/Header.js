export default function Header({
  name,
  tagline,
}) {
  const [brandStart, ...brandRest] = name.split(" ");
  const brandEnd = brandRest.join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-humo bg-marfil/95 shadow-[0_12px_28px_rgba(95,49,31,0.06)] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="eyebrow">Mercado de Coyoacán</p>

            <div className="mt-1 flex flex-wrap items-end gap-x-2 gap-y-1">
              <span className="whitespace-nowrap font-display text-[2.25rem] leading-none text-carbon sm:text-[2.85rem]">
                {brandStart}
              </span>
              {brandEnd ? (
                <span className="whitespace-nowrap font-display text-[2.25rem] leading-none text-vino-700 sm:text-[2.85rem]">
                  {brandEnd}
                </span>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-vino-100 bg-vino-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-vino-700">
                {tagline}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:items-end">
            <nav className="flex flex-wrap gap-2">
              <a
                className="rounded-full border border-humo bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-carbon/72 transition hover:border-vino-700/25 hover:text-vino-700"
                href="#promociones"
              >
                Miércoles de Plaza
              </a>
              <a
                className="rounded-full border border-humo bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-carbon/72 transition hover:border-vino-700/25 hover:text-vino-700"
                href="#envio"
              >
                Envío
              </a>
              <a
                className="rounded-full border border-humo bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-carbon/72 transition hover:border-vino-700/25 hover:text-vino-700"
                href="#precios"
              >
                Precios
              </a>
              <a
                className="rounded-full border border-humo bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-carbon/72 transition hover:border-vino-700/25 hover:text-vino-700"
                href="#al-vacio"
              >
                Alto Vacío
              </a>
              <a
                className="rounded-full border border-humo bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-carbon/72 transition hover:border-vino-700/25 hover:text-vino-700"
                href="#ubicacion"
              >
                Ubicación
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
