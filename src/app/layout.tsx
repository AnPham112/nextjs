import type { Metadata } from "next";
import localFont from 'next/font/local'
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/ui/header";

const roboto = localFont({
  src: [
    {
      path: './Roboto-Thin.woff2',
      weight: '100',
    },
    {
      path: './Roboto-Light.woff2',
      weight: '300',
    },
    {
      path: './Roboto-Regular.woff2',
      weight: '400',
    },
    {
      path: './Roboto-Medium.woff2',
      weight: '500',
    },
    {
      path: './Roboto-Bold.woff2',
      weight: '700',
    },
  ],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
