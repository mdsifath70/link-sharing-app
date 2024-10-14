import Layout from "@/components/Layout";
import getFonts from "@/libs/getFonts";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Link sharing app - Devlinks",
  openGraph: {
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fonts = getFonts();

  return (
    <html lang="en" className={fonts.variables}>
      <body suppressHydrationWarning className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
