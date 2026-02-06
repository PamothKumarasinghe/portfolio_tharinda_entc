import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Create Personal Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
