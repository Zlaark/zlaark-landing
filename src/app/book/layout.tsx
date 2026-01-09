import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Call | ZLAARK',
  description: 'Schedule a strategy session with Zlaark. We only take on 3 projects at a time to ensure focused, premium delivery. Limited availability.',
  keywords: ['book consultation', 'schedule call', 'project consultation', 'strategy session'],
  openGraph: {
    title: 'Book a Call | ZLAARK',
    description: 'Schedule a strategy session with Zlaark.',
    url: 'https://zlaark.com/book',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
