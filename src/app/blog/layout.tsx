import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | ZLAARK',
  description: 'Insights on web design, development trends, and digital strategy from the Zlaark team. Stay updated with the latest in tech and design.',
  keywords: ['web design blog', 'development insights', 'tech trends', 'design articles'],
  openGraph: {
    title: 'Blog | ZLAARK',
    description: 'Insights on web design and development.',
    url: 'https://zlaark.com/blog',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
