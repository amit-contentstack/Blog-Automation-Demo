import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../../../components/layout/Container";
import Section from "../../../components/layout/Section";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { BlogCard } from "@/components";
import stack from "@/utlis/contentstack-sdk";
import { Blog, Blogs } from "@/types/entries";
import { QueryOperation } from "@contentstack/delivery-sdk";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const { slug } = await params;

  const query = stack
    .contentType("blog")
    .entry()
    .includeReference(["blog_author"]);

  const { entries = [] } = (await query
    .query()
    .where("url", QueryOperation.EQUALS, `/${slug}`)
    .find()) as Blogs;

  const blog = entries[0] as Blog;

  console.log("BLOG :", blog);

  return (
    <main>
      {/* Hero Section with Featured Image */}
      <Section className="bg-white pt-24">
        <Container>
          {/* Featured Image */}
          <div className="relative aspect-[16/7] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl mb-8">
            <Image
              src={blog.feature_image.url}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="max-w-4xl">
            <Badge
              variant="primary"
              size="md"
              className="bg-ecoware-primary-accent text-ecoware-primary font-medium px-4 py-2 rounded-full text-sm mb-6"
            >
              {blog.blog_category.category}
            </Badge>

            <h1 className="text-4xl lg:text-5xl font-bold text-ecoware-text-dark mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ecoware-primary-accent rounded-full flex items-center justify-center">
                  <span className="text-ecoware-primary font-semibold text-sm">
                    {blog.blog_author[0].title.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-ecoware-text-dark">
                    Written by {blog.blog_author[0].title}
                  </p>
                  <p className="text-sm text-ecoware-gray-dark">
                    {formatDate(blog.published_date)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                {/* Article Content */}
                <div className="space-y-6">
                  <p className="text-lg text-ecoware-gray-dark leading-relaxed">
                    {blog.description}
                  </p>

                  {/* Dynamic Blog Content Sections */}
                  {blog.blog_content.map((contentSection, index) => (
                    <div key={index} className="space-y-6">
                      {/* Section Title */}
                      {contentSection.section.section_title && (
                        <h2 className="text-2xl font-semibold text-ecoware-text-dark mt-8 mb-4">
                          {contentSection.section.section_title}
                        </h2>
                      )}

                      {/* Section Content */}
                      {contentSection.section.section_content && (
                        <p className="text-ecoware-gray-dark leading-relaxed">
                          {contentSection.section.section_content}
                        </p>
                      )}

                      {/* Section Images */}
                      {contentSection.section.section_images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                          {contentSection.section.section_images.map(
                            (image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="relative aspect-video overflow-hidden rounded-lg"
                              >
                                <Image
                                  src={image.url}
                                  alt={
                                    image.title ||
                                    `Section image ${imgIndex + 1}`
                                  }
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {/* Quotes */}
                      {contentSection.section.quotes && (
                        <blockquote className="border-l-4 border-ecoware-primary-accent bg-gray-50 p-4 my-6">
                          <p className="text-ecoware-text-dark font-medium italic">
                            "{contentSection.section.quotes}"
                          </p>
                        </blockquote>
                      )}

                      {/* Bullet Points */}
                      {contentSection.section.bullet_points.length > 0 && (
                        <ul className="list-disc pl-6 space-y-2 text-ecoware-gray-dark">
                          {contentSection.section.bullet_points.map(
                            (point, pointIndex) => (
                              <li key={pointIndex}>{point}</li>
                            )
                          )}
                        </ul>
                      )}

                      {/* Highlight Section */}
                      {contentSection.section.highlight && (
                        <div className="bg-ecoware-primary-accent/10 rounded-lg p-6 my-8">
                          <h3 className="text-lg font-semibold text-ecoware-primary mb-3">
                            Highlight
                          </h3>
                          <p className="text-ecoware-gray-dark">
                            {contentSection.section.highlight}
                          </p>
                        </div>
                      )}

                      {/* Reference Links */}
                      {contentSection.section.reference_links.title &&
                        contentSection.section.reference_links.href && (
                          <div className="mt-4">
                            <Link
                              href={contentSection.section.reference_links.href}
                              className="text-ecoware-primary hover:text-ecoware-primary/80 underline text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {contentSection.section.reference_links.title}
                            </Link>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Bio Section */}
              <div className="bg-ecoware-primary text-white rounded-2xl p-8 mt-16 mb-12">
                <div className="flex items-start gap-6">
                  <div className="min-w-24 h-24 bg-ecoware-primary-accent rounded-full relative overflow-hidden">
                    {blog.blog_author[0].image?.url ? (
                      <Image
                        src={blog.blog_author[0].image.url}
                        alt={blog.blog_author[0].title}
                        fill
                        className="object-cover rounded-full"
                        sizes="96px"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-ecoware-primary text-3xl font-bold">
                        {blog.blog_author[0].title
                          ? blog.blog_author[0].title.charAt(0)
                          : "A"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-ecoware-primary-accent">
                      {blog.blog_author[0].title}
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">
                      {blog.blog_author[0].detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {/* <div className="mt-32">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-ecoware-primary-accent rounded-full"></div>
                    <div className="w-2 h-2 bg-ecoware-text-dark rounded-full"></div>
                    <div className="w-2 h-2 bg-ecoware-text-dark rounded-full"></div>
                  </div>
                  <span className="text-ecoware-text-dark text-sm font-medium">
                    Related News & Blogs
                  </span>
                </div>

                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-ecoware-text-dark">
                    Latest Related News & Blogs
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedArticles.map((article) => (
                    <BlogCard key={article.slug} {...article} />
                  ))}
                </div>
              </div> */}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="space-y-8 sticky top-28">
                {/* Table of Contents */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-ecoware-primary-accent rounded-full"></div>
                    <h3 className="text-lg font-medium text-ecoware-text-dark">
                      Table of Content
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {blog.table_of_content.map((item, index) => (
                      <p
                        key={index}
                        className="text-sm mb-4 text-zinc-400 cursor-pointer hover:text-ecoware-primary transition-colors"
                      >
                        {item}
                      </p>
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

export default BlogDetailsPage;
