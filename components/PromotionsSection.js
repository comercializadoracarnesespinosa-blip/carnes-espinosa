import { formatPriceValue, formatProductPrice } from "@/lib/pricing";
import WhatsAppIcon from "@/components/WhatsAppIcon";

function buildProductIndex(categories = []) {
  return new Map(
    categories.flatMap((category) =>
      category.productos.map((product) => [
        product.nombre,
        {
          ...product,
          categoria: category.nombre,
        },
      ]),
    ),
  );
}

export default function PromotionsSection({
  section,
  categories = [],
  specialNote,
  whatsappDisplay,
  whatsappHref,
}) {
  if (!section?.items?.length) {
    return null;
  }

  const productIndex = buildProductIndex(categories);
  const itemsWrapperClass =
    section.items.length === 1
      ? "mt-6 max-w-2xl"
      : section.items.length === 2
        ? "mt-6 grid gap-4 lg:grid-cols-2"
        : "mt-6 grid gap-4 lg:grid-cols-3";

  return (
    <section
      id="promociones"
      className="surface-card px-5 py-7 sm:px-8 sm:py-8"
    >
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-vino-700 sm:text-[0.95rem]">
          {section.eyebrow || "Promociones"}
        </p>
        <h2 className="mt-3 font-display text-[2.5rem] font-semibold leading-[0.98] text-carbon sm:text-[3.4rem]">
          <span className="block">{section.titlePrefix || "Solo en"}</span>
          <span className="mt-1 block text-vino-700">{section.title}</span>
        </h2>
        {section.description ? (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-carbon/68 sm:text-base">
            {section.description}
          </p>
        ) : null}
      </div>

      <div className={itemsWrapperClass}>
        {section.items.map((item, index) => {
          const product = productIndex.get(item.producto);
          const title = item.titulo || product?.nombre || item.producto;
          const category = item.categoria || product?.categoria;
          const originalPrice =
            typeof item.precioAnterior === "number"
              ? formatPriceValue(
                  item.precioAnterior,
                  item.unidad || product?.unidad || "kg",
                )
              : typeof product?.precio === "number"
                ? formatPriceValue(product.precio, product.unidad)
              : null;
          const price =
            typeof item.precioPromocional === "number"
              ? formatPriceValue(item.precioPromocional, item.unidad || product?.unidad || "kg")
              : product
                ? formatProductPrice(product)
                : null;
          const hasPromoCopy =
            typeof item.precioPromocional === "number" &&
            ((typeof item.precioAnterior === "number" &&
              item.precioPromocional < item.precioAnterior) ||
              (typeof product?.precio === "number" &&
                item.precioPromocional < product.precio));

          return (
            <article
              key={`${item.producto}-${index}`}
              className={`rounded-[28px] border px-4 py-4 shadow-[0_12px_28px_rgba(23,19,17,0.05)] sm:px-5 ${
                item.destacado
                  ? "border-vino-100 bg-[linear-gradient(180deg,rgba(255,241,240,0.96),rgba(255,253,250,0.98))]"
                  : "border-humo bg-[#fffdfa]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-vino-100 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-vino-700">
                  {item.badge || "Promoción"}
                </span>
                {hasPromoCopy ? (
                  <div className="rounded-2xl border border-vino-100 bg-vino-700 px-3 py-2 text-right text-white shadow-[0_14px_28px_rgba(225,16,16,0.16)] sm:min-w-[9.2rem]">
                    <p className="text-[11px] font-medium leading-4 text-white/72">
                      De {originalPrice}
                    </p>
                    <p className="mt-1 text-base font-semibold leading-5 sm:text-[1.05rem]">
                      a solo {price}
                    </p>
                  </div>
                ) : price ? (
                  <span className="rounded-full border border-vino-100 bg-vino-700 px-3 py-1 text-sm font-semibold text-white">
                    {price}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 font-display text-[2rem] leading-tight text-carbon">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-carbon/66">
                {item.copy}
              </p>

              {category ? (
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-carbon/48">
                  {category}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {section.ctaText && whatsappHref ? (
          <a
            className="inline-flex items-center gap-2 rounded-full border border-vino-100 bg-white px-4 py-3 text-sm font-semibold text-carbon shadow-[0_10px_22px_rgba(23,19,17,0.05)] transition hover:border-vino-200 hover:bg-vino-50"
            href={whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            <WhatsAppIcon className="h-5 w-5 text-vino-700" />
            <span>{section.ctaText || `Haz tu pedido por WhatsApp: ${whatsappDisplay}`}</span>
          </a>
        ) : null}

        {section.legalNote ? (
          <p className="text-xs leading-5 text-carbon/52">
            {section.legalNote}
          </p>
        ) : null}
      </div>

      {specialNote?.text ? (
        <div className="mt-5 rounded-[22px] border border-vino-100 bg-[linear-gradient(180deg,rgba(255,241,240,0.92),rgba(247,237,227,0.92))] px-4 py-3.5 shadow-[0_12px_26px_rgba(225,16,16,0.08)] sm:px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {specialNote.title ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-vino-700">
                {specialNote.title}
              </p>
            ) : null}
            <p className="text-sm font-medium leading-6 text-carbon/76">
              {specialNote.text}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
