'use client'
import { Inter } from "next/font/google";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "./globals.css";
import '@shopify/polaris/build/esm/styles.css';
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider i18n={enTranslations}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}