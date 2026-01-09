import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ZLAARK',
  description: 'Read Zlaark\'s privacy policy. Learn how we collect, use, and protect your personal information.',
  keywords: ['privacy policy', 'data protection', 'user privacy'],
  openGraph: {
    title: 'Privacy Policy | ZLAARK',
    description: 'Read Zlaark\'s privacy policy.',
    url: 'https://zlaark.com/privacy',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
