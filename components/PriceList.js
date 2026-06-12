import { formatProductPrice } from "@/lib/pricing";

function getUnitLabel(product) {
  if (product.unidadLabel) {
    return product.unidadLabel;
  }

  if (product.unidad === "kg") {
    return "Por kilo";
  }

  if (product.unidad === "servicio") {
    return "Servicio";
  }

  return product.unidad || "";
}

export default function PriceList({
  categories,
  promotions = [],
}) {
  return (
    <section id="precios" className="surface-card px-5 py-7 sm:px-8 sm:py-8">
      <div className="max-w-3xl">
        <p className="eyebrow">Lista de precios</p>
        <h2 className="mt-3 section-title text-4xl sm:text-5xl">
          Precios por sección
        </h2>
        <p className="mt-3 text-sm leading-6 text-carbon/68 sm:text-base">
          Consulta nuestra lista para la mesa diaria, cortes selectos y
          preparados. Confirma disponibilidad por WhatsApp antes de cerrar tu
          pedido.
        </p>
      </div>

      {promotions.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {promotions.map((promo) => (
            <article
              key={promo.title}
              className="rounded-[22px] border border-humo bg-[#fffdfa] px-4 py-3.5 shadow-[0_8px_18px_rgba(23,19,17,0.04)]"
            >
              <span className="rounded-full border border-vino-100 bg-vino-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-vino-700">
                {promo.badge}
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-carbon">
                {promo.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-carbon/62">
                {promo.description}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        {categories.map((category, categoryIndex) => (
          <details
            key={category.id}
            className="group animate-floatUp overflow-hidden rounded-[28px] border border-humo bg-[#fffdfa] shadow-[0_12px_28px_rgba(23,19,17,0.05)]"
            open={categoryIndex === 0}
            style={{ animationDelay: `${categoryIndex * 80}ms` }}
          >
            <summary className="list-none cursor-pointer border-b border-humo bg-[linear-gradient(180deg,rgba(255,241,240,0.92),rgba(255,255,255,0.98))] px-5 py-4 [-webkit-details-marker]:hidden sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow">{category.etiqueta || "Sección"}</p>
                  <h3 className="mt-1 font-display text-3xl text-carbon sm:text-[2.35rem]">
                    {category.nombre}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-carbon/62">
                    {category.descripcion}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-carbon/46">
                    Toca para abrir o cerrar
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="w-fit rounded-full border border-humo bg-white px-3 py-2 text-xs uppercase tracking-[0.18em] text-carbon/58">
                    {category.productos.length} productos
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-vino-100 bg-vino-50 text-xl text-vino-700 transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </div>
            </summary>

            <ul className="divide-y divide-humo/80">
              {category.productos.map((product) => {
                const isPending = product.precio === null;
                const unitLabel = getUnitLabel(product);

                return (
                  <li
                    key={product.nombre}
                    className="px-5 py-4 sm:px-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 sm:pr-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold text-carbon sm:text-[1.05rem]">
                            {product.nombre}
                          </p>
                          {product.destacado ? (
                            <span className="rounded-full border border-vino-100 bg-vino-50 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-vino-700">
                              Selección
                            </span>
                          ) : null}
                        </div>

                        {product.descripcion ? (
                          <p className="mt-1 text-sm leading-6 text-carbon/56">
                            {product.descripcion}
                          </p>
                        ) : null}

                        {unitLabel ? (
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-carbon/45">
                            {unitLabel}
                          </p>
                        ) : null}
                      </div>

                      <div className="shrink-0">
                        <p
                          className={`text-left text-xl font-bold tracking-tight sm:text-right ${
                            isPending ? "text-carbon/72" : "text-vino-700"
                          }`}
                        >
                          {formatProductPrice(product)}
                        </p>
                      </div>
                    </div>

                    {isPending ? (
                      <p className="mt-2 text-xs leading-5 text-carbon/54">
                        Confirma precio actualizado y disponibilidad por
                        WhatsApp.
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] border border-humo bg-arena px-4 py-4 text-sm leading-6 text-carbon/70">
        Los precios pueden cambiar sin previo aviso. Confirma disponibilidad y
        precio actualizado por WhatsApp.
      </div>
    </section>
  );
}
