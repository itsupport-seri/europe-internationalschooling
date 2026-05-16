import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  preload: false,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", 
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata = {
  title: "International Schooling Europe",
  description: "World-class education, anywhere.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
