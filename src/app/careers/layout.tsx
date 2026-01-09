import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | ZLAARK',
  description: 'Join the Zlaark team. We are looking for passionate designers, developers, and strategists who want to craft the future of digital experiences.',
  keywords: ['careers', 'jobs', 'work at zlaark', 'digital agency jobs'],
  openGraph: {
    title: 'Careers | ZLAARK',
    description: 'Join the Zlaark team.',
    url: 'https://zlaark.com/careers',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
