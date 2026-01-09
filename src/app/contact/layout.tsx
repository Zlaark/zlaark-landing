import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | ZLAARK',
  description: 'Start your project with Zlaark. We take on limited projects each month to ensure focused, high-quality delivery. Tell us about your vision.',
  keywords: ['contact zlaark', 'hire web agency', 'project inquiry', 'get quote'],
  openGraph: {
    title: 'Contact Us | ZLAARK',
    description: 'Start your project with Zlaark.',
    url: 'https://zlaark.com/contact',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
