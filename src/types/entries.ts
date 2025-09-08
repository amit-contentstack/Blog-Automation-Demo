import { BaseEntry, BaseAsset } from "@contentstack/delivery-sdk";

export interface LandingPage extends BaseEntry {
  title: string;
  description: string;
  hero_image: BaseAsset[];
  tagline: string;
}

export interface Feature {
  feature_name: string;
  feature_details: string;
  feature_icon: BaseAsset;
}

export interface KeyFeatures extends BaseEntry {
  title: string;
  feature_description: string;
  features: Feature[];
}

export interface SocialLink {
  social_media_share: {
    title: string;
    url: {
      href: string;
    };
    icon: BaseAsset;
  }[];
}

export interface NavigationLink {
  links: {
    link_title: string;
    link_url: {
      href: string;
    };
  }[];
}

export interface Contact {
  details: {
    company_address: string;
    email: string;
    contact_number: string;
  };
}

export interface Footer extends BaseEntry {
  title: string;
  description: string;
  social_links: SocialLink;
  navigation_links: NavigationLink;
  contact_info: Contact;
}

export interface Author extends BaseEntry {
  title: string;
  detail: string;
  image: BaseAsset;
}

export interface BlogCategory extends BaseEntry {
  category: string[];
}

export interface BlogReferenceLinks {
  title: string;
  href: string;
}

export interface BlogSection {
  section: {
    section_title: string;
    section_content: string;
    reference_links: BlogReferenceLinks;
    section_images: BaseAsset[];
    highlight: string;
    bullet_points: string[];
    quotes: string;
  };
}

export type BlogContent = BlogSection[];

export interface Blog extends BaseEntry {
  title: string;
  description: string;
  feature_image: BaseAsset;
  blog_content: BlogContent;
  blog_author: Author[];
  table_of_content: string[];
  url: string;
  blog_category: {
    category: string;
  };
  published_date: string;
  platforms_to_post: string[];
}

export interface Blogs {
  entries: Blog[];
}
