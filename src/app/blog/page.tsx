import React from "react";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import BlogCard from "../../components/common/BlogCard";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import stack from "@/utlis/contentstack-sdk";
import { Blog, Blogs } from "@/types/entries";

// Mock blog data - in a real app this would come from a CMS or API
const mockBlogs = [
  {
    slug: "profitable-ad-campaigns",
    title:
      "A Beginner's Guide to Running Profitable Ad Campaigns: Strategies That Actually Work",
    excerpt:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia...",
    image: "/logo.png", // Using placeholder for now
    category: "Paid Advertising",
    tags: [
      "SEO",
      "Social Media Marketing",
      "PPC",
      "Affiliate Marketing",
      "Influencer Marketing",
      "Local SEO",
    ],
    publishedAt: "2025-05-15",
    author: {
      name: "John Doe",
    },
    readTime: 5,
  },
  {
    slug: "seo-strategies-2025",
    title: "Top 10 SEO Strategies That Still Work in 2025",
    excerpt:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia...",
    image: "/logo.png",
    category: "SEO",
    tags: ["SEO", "Content Marketing", "Local SEO"],
    publishedAt: "2025-05-14",
    author: {
      name: "Jane Smith",
    },
    readTime: 8,
  },
  {
    slug: "long-form-content-2025",
    title: "Why Long-Form Content Still Dominates in 2025",
    excerpt:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia...",
    image: "/logo.png",
    category: "Content Marketing",
    tags: ["Content Marketing", "SEO", "Social Media Marketing"],
    publishedAt: "2025-05-13",
    author: {
      name: "Mike Johnson",
    },
    readTime: 6,
  },
  {
    slug: "instagram-marketing-small-business",
    title: "Mastering Instagram Marketing for Small Businesses",
    excerpt:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia...",
    image: "/logo.png",
    category: "Social Media Marketing",
    tags: ["Social Media Marketing", "Instagram", "Small Business"],
    publishedAt: "2025-05-12",
    author: {
      name: "Sarah Wilson",
    },
    readTime: 7,
  },
  {
    slug: "consistency-digital-branding",
    title: "The Role of Consistency in Digital Branding",
    excerpt:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia...",
    image: "/logo.png",
    category: "Branding",
    tags: ["Branding", "Digital Marketing", "Brand Strategy"],
    publishedAt: "2025-05-11",
    author: {
      name: "David Brown",
    },
    readTime: 4,
  },
];

const popularTags = [
  "SEO",
  "Email Marketing",
  "Social Media Marketing",
  "PPC",
  "Affiliate Marketing",
  "Influencer Marketing",
  "Local SEO",
];

const recentPosts = [
  {
    title: "5 Reasons Why You Need a Full SEO Audit in 2025",
    date: "7 Nov 2025",
    slug: "seo-audit-2025",
  },
  {
    title: "5 Common PPC Mistakes That Drain Your Budget",
    date: "6 Nov 2025",
    slug: "ppc-mistakes-2025",
  },
  {
    title: "How to Write SEO-Friendly Blog Posts That Convert",
    date: "5 Nov 2025",
    slug: "seo-friendly-blog-posts",
  },
];

const BlogPage: React.FC = async () => {
  const query = stack
    .contentType("blog")
    .entry()
    .only([
      "title",
      "url",
      "feature_image",
      "blog_category",
      "description",
      "published_date",
    ])
    .query();

  const result = await query.includeCount().paginate().find<Blogs>();

  const { entries: blogs = [] as Blog[], count = 0 as number } = result;

  console.log(result);

  return (
    <main>
      {/* Hero Section */}
      <Section className="bg-white py-12">
        <Container>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-ecoware-primary-accent rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-ecoware-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-ecoware-primary text-sm font-medium">
                News & Blogs
              </span>
            </div>
            <h1 className="text-3xl font-bold text-ecoware-text-dark mb-2">
              Our Latest News & Blogs
            </h1>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Blog Posts - Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6 mb-8">
                {blogs.map((blog, index) => (
                  <BlogCard key={index} {...(blog as Blog)} />
                ))}
              </div>

              {/* Pagination - Only show if more than 10 blogs */}
              {count > 10 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1 text-ecoware-gray-dark border-ecoware-gray-medium hover:bg-ecoware-gray-light"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    className="px-3 py-1 text-xs bg-ecoware-primary text-white"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1 text-ecoware-gray-dark border-ecoware-gray-medium hover:bg-ecoware-gray-light"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1 text-ecoware-gray-dark border-ecoware-gray-medium hover:bg-ecoware-gray-light"
                  >
                    3
                  </Button>
                  <span className="px-2 text-ecoware-gray-dark text-sm">
                    ...
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1 text-ecoware-gray-dark border-ecoware-gray-medium hover:bg-ecoware-gray-light"
                  >
                    10
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1 text-ecoware-gray-dark border-ecoware-gray-medium hover:bg-ecoware-gray-light"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Search */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-ecoware-primary-accent rounded-full"></div>
                    <h3 className="text-lg font-medium text-ecoware-text-dark">
                      Search
                    </h3>
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search"
                      className="pr-10 text-sm"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ecoware-gray-dark hover:text-ecoware-primary">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Popular Tags */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-ecoware-primary-accent rounded-full"></div>
                    <h3 className="text-lg font-medium text-ecoware-text-dark">
                      Popular Tags
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-ecoware-primary-accent rounded-full"></div>
                    <h3 className="text-lg font-medium text-ecoware-text-dark">
                      Recent Post
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {recentPosts.map((post, index) => (
                      <div
                        key={index}
                        className="flex items-start border border-transparent space-x-3 p-3 bg-ecoware-gray-light rounded-lg hover:border hover:border-ecoware-gray-medium hover:scale-105 transition-all"
                      >
                        <div className="w-12 h-12 bg-ecoware-primary-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-ecoware-primary font-semibold text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-zinc-500 leading-tight mb-1 hover:text-ecoware-primary cursor-pointer">
                            {post.title}
                          </h4>
                          <p className="text-xs text-zinc-400">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-gradient-to-br from-ecoware-primary to-ecoware-primary/90 rounded-lg p-6 text-center text-white">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-ecoware-primary-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-ecoware-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-sm font-semibold mb-2">
                      Looking to Elevate Your Digital Presence?
                    </h4>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-ecoware-primary-accent text-ecoware-primary hover:bg-ecoware-primary-accent/90 text-xs font-medium"
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default BlogPage;
