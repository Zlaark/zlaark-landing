import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ZLAARK',
  description: 'Read Zlaark\'s terms of service. Understand the terms and conditions for using our services.',
  keywords: ['terms of service', 'terms and conditions', 'legal'],
  openGraph: {
    title: 'Terms of Service | ZLAARK',
    description: 'Read Zlaark\'s terms of service.',
    url: 'https://zlaark.com/terms',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
