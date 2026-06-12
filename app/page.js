import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import PriceList from "@/components/PriceList";
import PromotionsSection from "@/components/PromotionsSection";
import ShippingCoverageSection from "@/components/ShippingCoverageSection";
import TrustSection from "@/components/TrustSection";
import VacuumPackagingSection from "@/components/VacuumPackagingSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import shippingConfig from "@/data/envios.json";
import business from "@/data/negocio.json";
import catalog from "@/data/precios.json";
import {
  buildGoogleMapsEmbedUrl,
  buildWhatsAppLink,
} from "@/lib/links";

const featuredProducts = catalog.categorias
  .flatMap((categoria) =>
    categoria.productos.map((producto) => ({
      ...producto,
      categoria: categoria.nombre,
    })),
  )
  .filter((producto) => producto.destacado)
  .slice(0, 4);

export default function HomePage() {
  const whatsappHref = buildWhatsAppLink(
    business.whatsappNumber,
    business.whatsappMessage,
    business.whatsappUrl,
  );
  const mapsEmbedUrl = buildGoogleMapsEmbedUrl(
    business.googleMapsQuery || `${business.nombre} ${business.ubicacion}`,
  );

  return (
    <div className="relative isolate overflow-hidden">
      <WhatsAppButton href={whatsappHref} />

      <Header
        name={business.nombre}
        tagline={business.headerTagline}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <Hero
          brandName={business.nombre}
          logo={business.logo}
          eyebrow={business.heroEyebrow}
          title={business.heroTitle}
          subtitle={business.heroSubtitle}
          description={business.heroText}
          mapsUrl={business.googleMapsUrl}
          locationLabel={business.ubicacionCorta}
          whatsappDisplay={business.whatsappDisplay}
          featuredProducts={featuredProducts}
        />

        <PromotionsSection
          section={catalog.seccionPromociones}
          categories={catalog.categorias}
          specialNote={catalog.notaPromocional}
          whatsappDisplay={business.whatsappDisplay}
          whatsappHref={whatsappHref}
        />

        <PriceList
          categories={catalog.categorias}
          promotions={catalog.promociones}
        />

        <ShippingCoverageSection
          shippingConfig={shippingConfig}
          shortAddress={business.ubicacionCorta}
          whatsappDisplay={business.whatsappDisplay}
          whatsappHref={whatsappHref}
        />

        <VacuumPackagingSection
          title={business.vacuumTitle}
          description={business.vacuumText}
          benefits={business.vacuumBenefits}
          locationLabel={business.ubicacionCorta}
        />

        <TrustSection
          title="Tradición y calidad en Coyoacán"
          text={business.trustText}
          quote={business.fraseHistorica}
          mapsUrl={business.googleMapsUrl}
          instagram={business.instagram}
          facebook={business.facebook}
          locationLabel={business.ubicacionCorta}
        />

        <Location
          address={business.ubicacion}
          shortAddress={business.ubicacionCorta}
          note={business.ubicacionTexto}
          mapsUrl={business.googleMapsUrl}
          mapsEmbedUrl={mapsEmbedUrl}
          schedule={business.horario}
          whatsappDisplay={business.whatsappDisplay}
        />
      </main>

      <Footer
        name={business.nombre}
        note={business.footerNote}
        address={business.ubicacion}
        whatsappDisplay={business.whatsappDisplay}
        whatsappHref={whatsappHref}
        instagram={business.instagram}
        facebook={business.facebook}
      />
    </div>
  );
}
