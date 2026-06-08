import ShippingCoverageChecker from "@/components/ShippingCoverageChecker";

export default function ShippingCoverageSection({
  shippingConfig,
  shortAddress,
  whatsappDisplay,
  whatsappHref,
}) {
  if (!shippingConfig) {
    return null;
  }

  return (
    <section
      id="envio"
      className="surface-card relative overflow-hidden px-5 py-7 sm:px-8 sm:py-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,16,16,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(195,160,107,0.12),transparent_28%)]" />

      <div className="relative grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="eyebrow">Reparto a domicilio</p>
          <h2 className="mt-3 section-title text-4xl sm:text-5xl">
            Revisa tu envío por código postal
          </h2>
          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-vino-700 sm:text-lg">
            Consulta en segundos si tu pedido entra en zona de envío sin costo
            , si aplica la tarifa de reparto o si tu zona no tiene cobertura.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-carbon/68 sm:text-base">
            Ingresa tu código postal y revisa la cobertura antes de cerrar tu
            pedido. La referencia de salida es {shortAddress}.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-vino-100 bg-vino-700 p-4 text-white shadow-[0_14px_30px_rgba(122,26,42,0.14)]">
              <p className="text-xs uppercase tracking-[0.22em] text-white/72">
                Consulta rápida
              </p>
              <p className="mt-2 text-lg font-semibold leading-7">
                Respuesta inmediata para envío gratis o con costo.
              </p>
            </div>

            <div className="rounded-[22px] border border-humo bg-white p-4 shadow-[0_8px_20px_rgba(95,48,31,0.05)]">
              <p className="text-xs uppercase tracking-[0.22em] text-carbon/45">
                Para pedidos
              </p>
              <p className="mt-2 text-lg font-semibold leading-7 text-carbon">
                Úsalo antes de escribir por WhatsApp y agiliza tu compra.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:pl-4">
          <ShippingCoverageChecker
            shippingConfig={shippingConfig}
            whatsappDisplay={whatsappDisplay}
            whatsappHref={whatsappHref}
          />
        </div>
      </div>
    </section>
  );
}
