export default function Location({
  address,
  shortAddress,
  note,
  mapsUrl,
  mapsEmbedUrl,
  schedule,
  whatsappDisplay,
}) {
  return (
    <section id="ubicacion" className="surface-card px-5 py-7 sm:px-8 sm:py-8">
      <div className="max-w-2xl">
        <p className="eyebrow">Ubicación y cómo llegar</p>
        <h2 className="mt-3 section-title text-4xl sm:text-5xl">
          Visítanos en el Mercado de Coyoacán
        </h2>
        <p className="mt-3 text-sm leading-6 text-carbon/68 sm:text-base">
          Encuentra fácilmente el local y confirma por WhatsApp si necesitas
          ayuda para ubicarte dentro del mercado.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[28px] border border-humo bg-[#fffdf9] p-5 shadow-[0_12px_28px_rgba(97,48,30,0.06)]">
          <p className="eyebrow">Dirección</p>
          <h3 className="mt-2 font-display text-4xl text-carbon">
            {shortAddress}
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-6 text-carbon/68">
            {address}
          </p>
          <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-vino-700">
            {note}
          </p>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-humo bg-white">
            <iframe
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapsEmbedUrl}
              title="Ubicación de Carnes Espinosa en Google Maps"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              className="btn-primary min-h-14 w-full px-7 text-base sm:w-auto"
              href={mapsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Cómo llegar
            </a>
          </div>
        </article>

        <article className="rounded-[28px] border border-humo bg-[#fffdf9] p-5 shadow-[0_12px_28px_rgba(97,48,30,0.06)]">
          <p className="eyebrow">{schedule.titulo}</p>
          <h3 className="mt-2 font-display text-4xl text-carbon">
            Planea tu visita
          </h3>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
              <p className="font-medium text-carbon">{schedule.dias}</p>
              <p className="mt-1 text-sm text-carbon/62">{schedule.horas}</p>
            </div>

            <div className="rounded-2xl border border-vino-100 bg-vino-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.22em] text-vino-700">
                WhatsApp
              </p>
              <p className="mt-2 text-lg font-semibold text-carbon">
                {whatsappDisplay}
              </p>
            </div>

            <div className="rounded-2xl border border-humo bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.22em] text-carbon/45">
                Ubicación
              </p>
              <p className="mt-2 text-base font-semibold text-carbon">
                {shortAddress}
              </p>
              <p className="mt-1 text-sm leading-6 text-carbon/60">
                {note}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-carbon/56">{schedule.nota}</p>
        </article>
      </div>
    </section>
  );
}
