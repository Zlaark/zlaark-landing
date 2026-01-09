import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | ZLAARK',
  description: 'Explore our portfolio of award-winning web designs, mobile applications, and brand identities. Case studies featuring FinTech, E-Commerce, and Streaming platforms.',
  keywords: ['portfolio', 'case studies', 'web design examples', 'mobile app portfolio'],
  openGraph: {
    title: 'Our Work | ZLAARK',
    description: 'Explore our portfolio of award-winning digital projects.',
    url: 'https://zlaark.com/work',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
