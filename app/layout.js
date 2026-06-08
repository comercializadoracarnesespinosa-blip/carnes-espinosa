import business from "@/data/negocio.json";
import "./globals.css";

const seo = business.seo;

// TODO: Agregar `metadataBase` y `alternates.canonical` cuando exista el dominio oficial.
// TODO: Agregar imagen Open Graph/Twitter confirmada cuando exista el asset final.
export const metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.title,
    description: seo.description,
    locale: "es_MX",
    type: "website",
    siteName: business.nombre,
  },
  twitter: {
    card: seo.twitterCard,
    title: seo.title,
    description: seo.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-marfil font-sans text-carbon antialiased">{children}</body>
    </html>
  );
}
