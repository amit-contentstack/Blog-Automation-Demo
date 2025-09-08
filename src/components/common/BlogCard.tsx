import React from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "../ui/Badge";
import { Blog } from "@/types/entries";

const BlogCard: React.FC<Blog> = ({
  url,
  title,
  feature_image,
  blog_category,
  description,
  published_date,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`p-4 bg-white border border-ecoware-gray-medium rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
    >
      <Link href={`/blog${url}`} className="flex flex-col gap-4">
        {/* Featured Image */}
        <div className="">
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl">
            <Image
              src={feature_image.url}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105 grayscale hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col px-1 gap-2 grow">
          {/* Category and Date Badges */}
          <div className="flex gap-3 mb-2">
            <Badge
              variant="primary"
              size="sm"
              className="bg-ecoware-primary-accent text-ecoware-primary font-medium px-4 py-2 rounded-full text-sm"
            >
              {blog_category.category}
            </Badge>
            <Badge
              variant="primary"
              size="sm"
              className="bg-ecoware-primary-accent text-ecoware-primary font-medium px-4 py-2 rounded-full text-sm"
            >
              {formatDate(published_date)}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-ecoware-text-dark mb-2 leading-tight hover:text-ecoware-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-ecoware-gray-dark text-base leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Read More Link */}
          <div className="flex items-center grow">
            <span className="text-ecoware-primary font-medium hover:text-ecoware-primary-hover transition-colors flex items-center gap-2 text-base border-b border-ecoware-primary pb-1">
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
