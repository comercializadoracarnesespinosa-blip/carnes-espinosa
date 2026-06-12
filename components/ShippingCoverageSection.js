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
            En segundos sabrás si tu pedido entra gratis, si aplica envío o si
            tu zona no tiene cobertura.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="info-pill">Respuesta inmediata</span>
            <span className="info-pill">Referencia: {shortAddress}</span>
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
