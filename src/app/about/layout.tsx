import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | ZLAARK',
  description: 'Meet the architects of digital excellence. Zlaark is an award-winning agency crafting immersive web experiences, mobile apps, and brand identities since 2025.',
  keywords: ['about zlaark', 'digital agency team', 'web design agency', 'creative agency'],
  openGraph: {
    title: 'About Us | ZLAARK',
    description: 'Meet the architects of digital excellence.',
    url: 'https://zlaark.com/about',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
