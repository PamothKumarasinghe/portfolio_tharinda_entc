import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: {
    default: "Tharinda Abeywardana | Electronic & Telecommunication Engineer",
    template: "%s | Tharinda Abeywardana"
  },
  description: "Electronic and Telecommunication Engineering undergraduate at University of Moratuwa, Sri Lanka. Passionate about embedded systems, signal processing, and innovative technology solutions.",
  keywords: [
    "Tharinda Abeywardana",
    "Electronic Engineering",
    "Telecommunication Engineering",
    "University of Moratuwa",
    "Embedded Systems",
    "Signal Processing",
    "Sri Lanka Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Tharinda Abeywardana" }],
  creator: "Tharinda Abeywardana",
  publisher: "Tharinda Abeywardana",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tharindacw.mrt.lk'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Tharinda Abeywardana | Electronic & Telecommunication Engineer",
    description: "Electronic and Telecommunication Engineering undergraduate at University of Moratuwa, Sri Lanka. Passionate about embedded systems, signal processing, and innovative technology solutions.",
    siteName: "Tharinda Abeywardana Portfolio",
    images: [
      {
        url: "/profilePic.jpeg",
        width: 1200,
        height: 630,
        alt: "Tharinda Abeywardana"
      }
    ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Tharinda Abeywardana | Electronic & Telecommunication Engineer",
  //   description: "Electronic and Telecommunication Engineering undergraduate at University of Moratuwa, Sri Lanka.",
  //   images: ["/profilePic.jpeg"],
  //   creator: "@tharinda" // Update with actual Twitter handle if available
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e1a" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://tharindacw.mrt.lk'} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
