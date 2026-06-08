export function buildWhatsAppLink(number, message, explicitUrl = "") {
  if (explicitUrl) {
    return explicitUrl;
  }

  const cleanNumber = number.replace(/\D/g, "");
  const query = new URLSearchParams({ text: message }).toString();

  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?${query}`;
  }

  return `https://wa.me/?${query}`;
}

export function buildGoogleMapsEmbedUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
