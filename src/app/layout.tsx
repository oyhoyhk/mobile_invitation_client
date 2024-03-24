import "./globals.css";
import "./fonts/fonts.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "결혼식",
  description: "결혼식",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
