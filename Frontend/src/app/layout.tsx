import "./globals.css";
import Providers from "@/components/Providers";
import ThemeInitializer from "@/components/ThemeInitializer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "CineManage | Professional Movie Management",
  description: "Experience the next level of movie library management with a premium dark-themed UI.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <ThemeInitializer />
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
