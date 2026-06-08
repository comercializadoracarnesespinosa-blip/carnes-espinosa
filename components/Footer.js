export default function Footer({
  name,
  note,
  address,
  whatsappDisplay,
  whatsappHref,
  instagram,
  facebook,
}) {
  return (
    <footer className="border-t border-humo bg-[#fffaf4]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-24 pt-6 text-sm text-carbon/58 sm:px-6 sm:pb-8 lg:px-8">
        <div>
          <p className="font-display text-3xl text-vino-700">{name}</p>
          <p className="mt-2 max-w-2xl text-carbon/62">{note}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-humo bg-white px-4 py-3 shadow-[0_8px_20px_rgba(95,48,31,0.05)]">
            <p className="text-xs uppercase tracking-[0.2em] text-carbon/42">
              Ubicación
            </p>
            <p className="mt-2 text-carbon/72">{address}</p>
          </div>

          <div className="rounded-2xl border border-humo bg-white px-4 py-3 shadow-[0_8px_20px_rgba(95,48,31,0.05)]">
            <p className="text-xs uppercase tracking-[0.2em] text-carbon/42">
              WhatsApp
            </p>
            <a
              className="mt-2 inline-block text-carbon/72 transition hover:text-vino-700"
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              {whatsappDisplay}
            </a>
          </div>

          <div className="rounded-2xl border border-humo bg-white px-4 py-3 shadow-[0_8px_20px_rgba(95,48,31,0.05)]">
            <p className="text-xs uppercase tracking-[0.2em] text-carbon/42">
              Instagram
            </p>
            <a
              className="mt-2 inline-block text-carbon/72 transition hover:text-vino-700"
              href={instagram.url}
              rel="noreferrer"
              target="_blank"
            >
              {instagram.label}
            </a>
          </div>

          <div className="rounded-2xl border border-humo bg-white px-4 py-3 shadow-[0_8px_20px_rgba(95,48,31,0.05)]">
            <p className="text-xs uppercase tracking-[0.2em] text-carbon/42">
              Facebook
            </p>
            <a
              className="mt-2 inline-block text-carbon/72 transition hover:text-vino-700"
              href={facebook.url}
              rel="noreferrer"
              target="_blank"
            >
              {facebook.label}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <a
            className="btn-secondary"
            href="#inicio"
          >
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
