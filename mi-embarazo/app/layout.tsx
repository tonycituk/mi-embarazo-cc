import "./globals.css";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
