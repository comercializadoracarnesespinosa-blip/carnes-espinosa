export default function TrustSection({
  title,
  text,
  quote,
  mapsUrl,
  instagram,
  facebook,
  locationLabel,
}) {
  return (
    <section id="confianza" className="surface-card px-5 py-7 sm:px-8 sm:py-8">
      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div>
          <p className="eyebrow">Tradición y calidad en Coyoacán</p>
          <h2 className="mt-3 section-title text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-carbon/70 sm:text-base">
            {text}
          </p>

          <div className="mt-5 rounded-[24px] border border-vino-100 bg-vino-700 px-5 py-4 text-white shadow-[0_18px_34px_rgba(122,26,42,0.15)]">
            <p className="text-xs uppercase tracking-[0.22em] text-white/72">
              Desde hace 69 años
            </p>
            <blockquote className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
              “{quote}”
            </blockquote>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[24px] border border-humo bg-[#fffdf9] p-4 shadow-[0_12px_28px_rgba(97,48,30,0.06)] sm:p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-vino-700">
              Confianza comercial
            </p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Trayectoria
                </p>
                <p className="mt-1.5 text-lg font-semibold text-carbon">
                  69 años
                </p>
              </div>
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Servicio
                </p>
                <p className="mt-1.5 text-lg font-semibold text-carbon">
                  Reparto a domicilio
                </p>
              </div>
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Ventaja
                </p>
                <p className="mt-1.5 text-lg font-semibold text-carbon">
                  Alto Vacío
                </p>
              </div>
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Ubicación
                </p>
                <p className="mt-1.5 text-lg font-semibold text-carbon">
                  {locationLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3">
            <a
              className="btn-secondary min-h-12 w-full px-5 text-sm sm:w-auto"
              href={mapsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Cómo llegar
            </a>
            <a
              className="btn-secondary min-h-12 w-full px-5 text-sm sm:w-auto"
              href={instagram.url}
              rel="noreferrer"
              target="_blank"
            >
              Instagram {instagram.label}
            </a>
            <a
              className="btn-secondary min-h-12 w-full px-5 text-sm sm:w-auto"
              href={facebook.url}
              rel="noreferrer"
              target="_blank"
            >
              Facebook {facebook.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
