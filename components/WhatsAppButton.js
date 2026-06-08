import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function WhatsAppButton({ href }) {
  return (
    <a
      aria-label="Pedir por WhatsApp"
      className="btn-whatsapp fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] px-5 py-4 text-sm ring-4 ring-white/90 sm:bottom-6 sm:right-6"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="truncate">Pedir por WhatsApp</span>
    </a>
  );
}
