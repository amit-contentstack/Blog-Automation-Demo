import React from "react";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import BlogCard from "../../components/common/BlogCard";
import PopularTags from "../../components/common/PopularTags";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import stack from "@/utils/contentstack-sdk";
import { Blog, Blogs } from "@/types/entries";

// Next.js 15 App Router - Route Segment Config
export const dynamic = "force-dynamic"; // Prevent static generation at build time
export const revalidate = 60; // Revalidate every 1 minutes in production

const BlogPage: React.FC = async () => {
  // make dummy loading fetch call
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  const query = stack
    .contentType("blog")
    .entry()
    .only(["title", "url", "feature_image", "blog_category", "description", "published_date"])
    .query();

  const result = await query.includeCount().paginate().find<Blogs>();

  const { entries: blogs = [] as Blog[], count = 0 as number } = result;

  // console.log(result);

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
              <span className="text-ecoware-primary text-sm font-medium">News & Blogs</span>
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <span className="px-2 text-ecoware-gray-dark text-sm">...</span>
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <h3 className="text-lg font-medium text-ecoware-text-dark">Search</h3>
                  </div>
                  <div className="relative">
                    <Input type="text" placeholder="Search" className="pr-10 text-sm" />
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
                <PopularTags />

                {/* Recent Posts */}
                {/* <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-ecoware-primary-accent rounded-full"></div>
                    <h3 className="text-lg font-medium text-ecoware-text-dark">Recent Post</h3>
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
                </div> */}

                {/* Newsletter Subscription CTA */}
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
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-sm font-semibold mb-2">Stay Updated</h4>
                    <p className="text-xs text-white/90 mb-3">
                      Get weekly insights, industry trends, and eco-friendly solutions delivered to
                      your inbox.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-ecoware-primary-accent text-ecoware-primary hover:bg-ecoware-primary-accent/90 text-xs font-medium"
                  >
                    Subscribe Now
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
