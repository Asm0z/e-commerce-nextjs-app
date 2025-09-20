import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Footer from "./_Component/Footer/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/UserProvider";
import Navbar from "./_Component/Navbar/Navbar";
import BackToTopButton from "./_Component/BackToTopButton/BackToTopButton";
import CountProvider from "@/CountProvider";

const poppinsFont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Store",
  description:
    "E-Commerce Application with Next.js. Wide range of products including electronics, fashion, food and more. Find the best deal and shop now with fast delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppinsFont.className}`}>
        <UserProvider>
          <CountProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main>{children}</main>
              <Toaster richColors />
              <BackToTopButton />
              <Footer />
            </ThemeProvider>
          </CountProvider>
        </UserProvider>
      </body>
    </html>
  );
}
