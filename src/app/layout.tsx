import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Квартет - Рекламное агентство в Уфе | Наружная реклама, полиграфия, брендинг",
  description: "Производственно-рекламная группа Квартет в Уфе. Полный цикл рекламных услуг: наружная реклама, полиграфия, интерьерная реклама, брендинг. Опытные специалисты, качественное исполнение.",
  keywords: "реклама Уфа, рекламное агентство Уфа, наружная реклама, полиграфия, брендинг, печать баннеров, световые короба, вывески",
  authors: [{ name: "Квартет" }],
  robots: "index, follow",
  openGraph: {
    title: "Квартет - Рекламное агентство в Уфе",
    description: "Полный цикл рекламных услуг в Уфе и Республике Башкортостан",
    type: "website",
    locale: "ru_RU",
    siteName: "Квартет",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
