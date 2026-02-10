import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tharinda Abeywardana Portfolio',
    short_name: 'Tharinda Portfolio',
    description: 'Electronic and Telecommunication Engineering undergraduate portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0e1a',
    theme_color: '#00b4d8',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
