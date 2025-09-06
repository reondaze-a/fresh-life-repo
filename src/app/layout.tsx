// CHANGED: add `modal` parallel route slot to the layout signature
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Fresh Life Church",
  description: "Welcome to Fresh Life Church",
};

// CHANGED: include `modal` so intercepted routes can render over the page
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode; // NEW
}) {
  return (
    <html lang="en">
      <body className="min-h-svh bg-black text-white antialiased">
        <Providers>
          <div className="flex min-h-svh flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            {modal /* NEW: renders modal content when present */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
