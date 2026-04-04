import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "MR Agentix — AI Automation & Agentic Workflows",
  description:
    "MR Agentix builds AI agents, agentic workflows, and intelligent web systems for businesses ready to scale without adding headcount. Based in St. Louis, MO.",
  openGraph: {
    title: "MR Agentix — AI Automation & Agentic Workflows",
    description:
      "We build AI agents, automate workflows, and ship intelligent web systems. Based in St. Louis, working nationwide.",
    type: "website",
    url: "https://mragentix.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "MR Agentix — AI Automation & Agentic Workflows",
    description:
      "We build AI agents, automate workflows, and ship intelligent web systems.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MR Agentix",
              url: "https://mragentix.ai",
              email: "hello@mragentix.ai",
              description:
                "AI automation, agentic workflows, and intelligent web systems for businesses ready to scale.",
              areaServed: "US",
              address: {
                "@type": "PostalAddress",
                addressLocality: "St. Louis",
                addressRegion: "MO",
                addressCountry: "US",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
