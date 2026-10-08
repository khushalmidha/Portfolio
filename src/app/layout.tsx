import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { profile } from "@/lib/content/profile";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://khushalmidha.dev"),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s | ${profile.name}`,
  },
  description:
    "CS & AI undergraduate at IIIT Lucknow building full-stack products, backend systems, and applied AI. Codeforces Expert, CodeChef 5★, ICPC Regionalist.",
  keywords: [
    "Khushal Midha",
    "software engineer",
    "backend engineer",
    "competitive programming",
    "IIIT Lucknow",
    "full stack developer",
    "quant developer",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — Software Engineer`,
    description:
      "CS & AI undergraduate building full-stack products, backend systems, and applied AI. Codeforces Expert · CodeChef 5★ · ICPC Regionalist.",
    siteName: profile.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Engineer`,
    description: "CS & AI undergraduate · Full-stack · Backend · Competitive Programmer",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
