import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, WEB_OFFER } from "@/data/seo";
import "./globals.css";

const display = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Multiservices créatifs & techniques`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "ENE Solutions — photographie de mariage, cours de danse, DJ & événementiel, formation secourisme et développeur web. Sites et applications sur mesure.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Multiservices créatifs & techniques`,
    description:
      "Multiservices : photo, danse, événementiel, secourisme et développeur web. Création de sites et d’applications.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} — logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} | Multiservices créatifs & techniques`,
    description: WEB_OFFER.short,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
