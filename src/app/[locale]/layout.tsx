import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/index.scss";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Home",
  applicationName: "SA World",
  keywords: "sa world, sa, saw, playciti, game, summoners arena, evi store",
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "SA World",
    startupImage: "/96.png",
  },
  icons: {
    icon: [
      {
        url: "/96.png",
        sizes: "96x96",
        type: "image/x-icon",
      },
      {
        url: "/32.png",
        sizes: "32x32",
        type: "icon",
      },
      {
        url: "/48.png",
        sizes: "48x48",
        type: "icon",
      },
      {
        url: "/96.png",
        sizes: "96x96",
        type: "icon",
      },
    ],
    apple: "/257.png",
  },
  openGraph: {
    images: {
      url: "/96.png",
    },
  },
  twitter: {
    images: "/96.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
