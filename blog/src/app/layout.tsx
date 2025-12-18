import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Stemsphere Blog",
    template: "%s | Stemsphere Blog",
  },
  description:
    "STEM education content, workshop recaps, tutorials, and news from the Stemsphere Foundation.",
  keywords: ["STEM", "education", "coding", "robotics", "workshops", "students"],
  authors: [{ name: "Stemsphere Foundation" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.stemsf.org",
    siteName: "Stemsphere Blog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
