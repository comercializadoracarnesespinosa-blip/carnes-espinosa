const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function formatPriceValue(amount, unit = "") {
  const unitSuffix = unit ? `/${unit}` : "";

  return `${moneyFormatter.format(amount)}${unitSuffix}`;
}

export function formatProductPrice(product) {
  if (product.precio === null) {
    return product.displayPrice || "Pregunta por disponibilidad";
  }

  return formatPriceValue(product.precio, product.unidad);
}
