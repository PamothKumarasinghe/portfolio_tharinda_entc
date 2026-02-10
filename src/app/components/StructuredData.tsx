import Script from 'next/script'

interface StructuredDataProps {
  data: object
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tharinda Abeywardana',
  jobTitle: 'Electronic & Telecommunication Engineering Undergraduate',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tharindacw.mrt.lk',
  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tharindacw.mrt.lk'}/profilePic.jpeg`,
  sameAs: [
    // Add your social media profiles here when available
    'https://www.linkedin.com/in/tharinda-abeywardana-97304b1b8/',
    'https://github.com/tharinadacwa',
    // 'https://twitter.com/yourprofile',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'University of Moratuwa',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressRegion: 'Western Province',
    },
  },
  description: 'Electronic and Telecommunication Engineering undergraduate at University of Moratuwa, Sri Lanka. Passionate about embedded systems, signal processing, and innovative technology solutions.',
}

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tharinda Abeywardana Portfolio',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tharindacw.mrt.lk',
  description: 'Personal portfolio showcasing projects and skills in Electronic and Telecommunication Engineering',
  author: {
    '@type': 'Person',
    name: 'Tharinda Abeywardana',
  },
}
