const processSteps = [
  "Elige tus cortes",
  "Mándanos WhatsApp",
  "Confirmamos precio y disponibilidad",
  "Preparamos y empacamos al Alto Vacío",
  "Recoges en el Mercado de Coyoacán o pides reparto",
];

export default function VacuumPackagingSection({
  title,
  description,
  benefits,
  locationLabel,
}) {
  return (
    <section
      id="al-vacio"
      className="surface-card relative overflow-hidden px-5 py-7 sm:px-8 sm:py-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(194,154,91,0.15),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(161,38,57,0.08),transparent_28%)]" />

      <div className="relative grid gap-5 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
        <div>
          <p className="eyebrow">Empacado al Alto Vacío</p>
          <h2 className="mt-3 section-title text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-vino-700 sm:text-lg">
            {description}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-carbon/68 sm:text-base">
            Pide tu carne porcionada y empacada al Alto Vacío para recibir una
            presentación más limpia, práctica y fácil de organizar en casa.
          </p>

          <div className="mt-5 rounded-[24px] border border-vino-100 bg-vino-700 p-5 text-white shadow-[0_18px_34px_rgba(122,26,42,0.16)]">
            <p className="text-xs uppercase tracking-[0.22em] text-white/72">
              Ideal para compras organizadas
            </p>
            <p className="mt-2 text-lg font-semibold leading-7">
              Ideal para familias, compras semanales y clientes que buscan
              cortes mejor organizados.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/82">
              {locationLabel} con opción de recoger o confirmar reparto.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[24px] border border-humo bg-white p-4 shadow-[0_8px_20px_rgba(95,48,31,0.05)] sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">Beneficios</p>
              <span className="rounded-full border border-vino-100 bg-vino-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-vino-700">
                5 ventajas
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex min-h-11 items-center rounded-full border border-humo bg-marfil px-4 py-2 text-sm font-medium leading-5 text-carbon/80"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <details className="group rounded-[26px] border border-humo bg-[#fffdf9] p-4 shadow-[0_8px_20px_rgba(95,48,31,0.05)] sm:p-5">
            <summary className="list-none cursor-pointer [-webkit-details-marker]:hidden">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Cómo funciona</p>
                  <h3 className="mt-2 font-display text-2xl text-carbon sm:text-3xl">
                    Tu pedido en 5 pasos
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-carbon/68">
                    Toca para ver el proceso completo de empaque.
                  </p>
                </div>
                <span className="rounded-full border border-vino-100 bg-vino-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-vino-700 transition group-open:bg-vino-700 group-open:text-white">
                  Ver pasos
                </span>
              </div>
            </summary>

            <ol className="mt-4 grid gap-2 group-open:pt-1">
              {processSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-[18px] border border-humo bg-marfil px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vino-700 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-carbon/72">{step}</p>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </div>
    </section>
  );
}
