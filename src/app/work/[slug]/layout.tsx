import type { Metadata } from 'next';

// Project data for generating metadata
const projectsMetadata: Record<string, { title: string; description: string; category: string }> = {
  'venture-core': {
    title: 'Venture Core',
    description: 'Case study: Democratizing algorithmic trading for the modern investor. A FinTech platform designed for clarity and control.',
    category: 'FinTech Platform',
  },
  'nebula-stream': {
    title: 'Nebula Stream',
    description: 'Case study: A human-centric streaming platform competing in an algorithmic world.',
    category: 'Streaming Platform',
  },
  'apex-health': {
    title: 'Apex Health',
    description: 'Case study: Healthcare platform designed for accessibility and trust.',
    category: 'Healthcare',
  },
  'lumina-gallery': {
    title: 'Lumina Gallery',
    description: 'Case study: E-commerce platform for luxury art and collectibles.',
    category: 'E-Commerce',
  },
  'quant-x': {
    title: 'Quant X',
    description: 'Case study: Data visualization platform for quantitative analysis.',
    category: 'Data Platform',
  },
  'urbanscape': {
    title: 'Urbanscape',
    description: 'Case study: Brand identity and digital presence for urban development.',
    category: 'Branding',
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsMetadata[slug];

  if (!project) {
    return {
      title: 'Case Study | ZLAARK',
      description: 'Explore our case studies and portfolio work.',
    };
  }

  return {
    title: `${project.title} | Case Study | ZLAARK`,
    description: project.description,
    keywords: ['case study', project.category.toLowerCase(), 'portfolio', 'web design'],
    openGraph: {
      title: `${project.title} | Case Study | ZLAARK`,
      description: project.description,
      url: `https://zlaark.com/work/${slug}`,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og-image.png'],
    },
  };
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
