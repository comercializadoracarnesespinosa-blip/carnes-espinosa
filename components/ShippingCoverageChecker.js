"use client";

import { useMemo, useState } from "react";

function normalizePostalCode(value) {
  return value.replace(/\D/g, "").slice(0, 5);
}

export default function ShippingCoverageChecker({
  shippingConfig,
  whatsappDisplay,
  whatsappHref,
}) {
  const [postalCode, setPostalCode] = useState("");
  const [result, setResult] = useState(null);

  const freePostalCodes = useMemo(
    () => new Set(shippingConfig.freePostalCodes || []),
    [shippingConfig.freePostalCodes],
  );
  const paidPostalCodes = useMemo(
    () => new Set(shippingConfig.paidPostalCodes || []),
    [shippingConfig.paidPostalCodes],
  );
  const noCoveragePostalCodes = useMemo(
    () => new Set(shippingConfig.noCoveragePostalCodes || []),
    [shippingConfig.noCoveragePostalCodes],
  );

  function handleSubmit(event) {
    event.preventDefault();

    const cleanPostalCode = normalizePostalCode(postalCode);

    if (!cleanPostalCode) {
      setResult({
        kind: "empty",
        title: "",
        message: shippingConfig.messages.empty,
      });
      return;
    }

    if (cleanPostalCode.length !== 5) {
      setResult({
        kind: "invalid",
        title: "",
        message: shippingConfig.messages.invalid,
      });
      return;
    }

    if (freePostalCodes.has(cleanPostalCode)) {
      setResult({
        kind: "free",
        title: shippingConfig.messages.freeTitle,
        message: shippingConfig.messages.free,
      });
      return;
    }

    if (noCoveragePostalCodes.has(cleanPostalCode)) {
      setResult({
        kind: "noCoverage",
        title: shippingConfig.messages.noCoverageTitle,
        message: shippingConfig.messages.noCoverage,
      });
      return;
    }

    if (paidPostalCodes.has(cleanPostalCode)) {
      setResult({
        kind: "paid",
        title: shippingConfig.messages.paidTitle,
        message: shippingConfig.messages.paid,
      });
      return;
    }

    setResult({
      kind: "paid",
      title: shippingConfig.messages.paidTitle,
      message: shippingConfig.messages.paid,
    });
  }

  const resultStyles = {
    free: "border-vino-100 bg-vino-50 text-carbon",
    noCoverage: "border-humo bg-white text-carbon",
    paid: "border-humo bg-arena text-carbon",
    invalid: "border-humo bg-white text-carbon/70",
    empty: "border-humo bg-white text-carbon/70",
  };

  return (
    <div className="rounded-[24px] border border-humo bg-white p-4 shadow-[0_8px_20px_rgba(95,48,31,0.05)]">
      <p className="eyebrow">Envío por código postal</p>
      <h4 className="mt-2 font-display text-2xl text-carbon">
        {shippingConfig.title}
      </h4>
      <p className="mt-2 text-sm leading-6 text-carbon/62">
        {shippingConfig.description}
      </p>

      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          className="min-h-12 w-full rounded-full border border-humo bg-marfil px-4 text-base text-carbon outline-none transition placeholder:text-carbon/35 focus:border-vino-200 focus:bg-white"
          inputMode="numeric"
          maxLength={5}
          onChange={(event) => {
            setPostalCode(normalizePostalCode(event.target.value));
          }}
          placeholder={shippingConfig.placeholder}
          value={postalCode}
        />
        <button
          className="btn-primary min-h-12 shrink-0 px-6"
          type="submit"
        >
          {shippingConfig.buttonLabel}
        </button>
      </form>

      {result ? (
        <div
          className={`mt-4 rounded-[20px] border px-4 py-3 ${
            resultStyles[result.kind] || resultStyles.empty
          }`}
        >
          {result.title ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-vino-700">
              {result.title}
            </p>
          ) : null}
          <p className="mt-1 text-sm leading-6">{result.message}</p>
          {result.kind === "noCoverage" && whatsappHref ? (
            <a
              className="mt-3 inline-flex items-center rounded-full border border-vino-100 bg-vino-50 px-4 py-2 text-sm font-semibold text-vino-700 transition hover:bg-vino-100"
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              Consultar disponibilidad por WhatsApp: {whatsappDisplay}
            </a>
          ) : null}
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-5 text-carbon/48">
        {shippingConfig.note}
      </p>
    </div>
  );
}
