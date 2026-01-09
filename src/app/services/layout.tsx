import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | ZLAARK',
  description: 'Our digital services include Brand & Identity, Web Engineering, Mobile Ecosystems, Digital Commerce, and Product Strategy. Solutions engineered for dominance.',
  keywords: ['web design services', 'mobile app development', 'brand identity', 'ecommerce development'],
  openGraph: {
    title: 'Services | ZLAARK',
    description: 'Digital solutions engineered for dominance.',
    url: 'https://zlaark.com/services',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
