// Shared component types and interfaces

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  sustainability?: {
    recycled?: number;
    biodegradable?: boolean;
    carbonNeutral?: boolean;
  };
  specifications?: {
    material: string;
    dimensions?: string;
    weight?: string;
  };
  pricing?: {
    price?: string;
    unit?: string;
    minOrder?: number;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  readTime?: number;
  featured?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  interestedProducts: string[];
  preferredContact: 'email' | 'phone' | 'either';
}

export interface SustainabilityMetrics {
  carbonReduction: number;
  wasteReduction: number;
  recycledContent: number;
  biodegradablePercentage: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  avatar?: string;
  rating?: number;
}
