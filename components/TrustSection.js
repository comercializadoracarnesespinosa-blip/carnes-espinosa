export default function TrustSection({
  title,
  text,
  quote,
  mapsUrl,
  instagram,
  facebook,
}) {
  return (
    <section id="confianza" className="surface-card px-5 py-7 sm:px-8 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="eyebrow">Tradición y calidad en Coyoacán</p>
          <h2 className="mt-3 section-title text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-carbon/70 sm:text-base">
            {text}
          </p>

          <blockquote className="mt-6 rounded-[24px] border border-vino-100 bg-vino-700 px-5 py-5 font-display text-3xl leading-tight text-white shadow-[0_18px_34px_rgba(122,26,42,0.15)]">
            “{quote}”
          </blockquote>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[24px] border border-humo bg-[#fffdf9] p-5 shadow-[0_12px_28px_rgba(97,48,30,0.06)]">
            <p className="text-xs uppercase tracking-[0.24em] text-vino-700">
              Confianza comercial
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Trayectoria
                </p>
                <p className="mt-2 text-lg font-semibold text-carbon">
                  69 años
                </p>
              </div>
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Servicio
                </p>
                <p className="mt-2 text-lg font-semibold text-carbon">
                  Reparto a domicilio
                </p>
              </div>
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Ventaja
                </p>
                <p className="mt-2 text-lg font-semibold text-carbon">
                  Alto Vacío
                </p>
              </div>
              <div className="rounded-2xl border border-humo bg-marfil px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-carbon/45">
                  Ubicación
                </p>
                <p className="mt-2 text-lg font-semibold text-carbon">
                  Mercado de Coyoacán
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              className="btn-secondary min-h-14 w-full px-7 text-base sm:w-auto"
              href={mapsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Cómo llegar
            </a>
            <a
              className="btn-secondary min-h-14 w-full px-7 text-base sm:w-auto"
              href={instagram.url}
              rel="noreferrer"
              target="_blank"
            >
              Instagram {instagram.label}
            </a>
            <a
              className="btn-secondary min-h-14 w-full px-7 text-base sm:w-auto"
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
