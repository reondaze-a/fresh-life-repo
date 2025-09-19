import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Suspense } from "react";


export const metadata = {
  title: "Fresh Life Church",
  description: "Welcome to Fresh Life Church",
};

// include `modal` so intercepted routes can render over the page
export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body className="min-h-svh bg-black text-white antialiased">
        <Suspense fallback={null}>
          <Providers>
            <div className="flex min-h-svh flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              {modal}
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
