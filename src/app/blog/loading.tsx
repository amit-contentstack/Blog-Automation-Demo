import React from "react";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

const BlogPageSkeleton: React.FC = () => {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <Section className="bg-white py-12">
        <Container>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-ecoware-gray-medium rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-ecoware-gray-medium rounded animate-pulse"></div>
            </div>
            <div className="w-80 h-8 bg-ecoware-gray-medium rounded mx-auto animate-pulse"></div>
          </div>
        </Container>
      </Section>

      {/* Main Content Skeleton */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Blog Posts Skeleton - Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6 mb-8">
                {/* Blog Card Skeletons */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))}
              </div>

              {/* Pagination Skeleton */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-ecoware-gray-medium rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-ecoware-primary/20 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-ecoware-gray-medium rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-ecoware-gray-medium rounded animate-pulse"></div>
                <div className="w-4 h-4 bg-ecoware-gray-medium rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-ecoware-gray-medium rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-ecoware-gray-medium rounded animate-pulse"></div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Search Skeleton */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-ecoware-gray-medium rounded-full animate-pulse"></div>
                    <div className="w-16 h-5 bg-ecoware-gray-medium rounded animate-pulse"></div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-10 bg-ecoware-gray-light border border-ecoware-gray-medium rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Popular Tags Skeleton */}
                <PopularTagsSkeleton />

                {/* Newsletter CTA Skeleton */}
                <div className="bg-gradient-to-br from-ecoware-primary to-ecoware-primary/90 rounded-lg p-6 text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-ecoware-primary-accent/20 rounded-lg mx-auto mb-3 animate-pulse"></div>
                    <div className="w-20 h-4 bg-white/20 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="w-full h-3 bg-white/10 rounded mb-1 animate-pulse"></div>
                    <div className="w-3/4 h-3 bg-white/10 rounded mx-auto mb-3 animate-pulse"></div>
                  </div>
                  <div className="w-28 h-8 bg-ecoware-primary-accent/20 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};

// Blog Card Skeleton Component
const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white border border-ecoware-gray-medium rounded-2xl">
      <div className="flex flex-col gap-4">
        {/* Featured Image Skeleton */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-ecoware-gray-light to-ecoware-gray-medium rounded-xl animate-pulse"></div>

        {/* Content Skeleton */}
        <div className="flex flex-col px-1 gap-2">
          {/* Category and Date Badges Skeleton */}
          <div className="flex gap-3 mb-2">
            <div className="w-20 h-6 bg-ecoware-primary-accent/20 rounded-full animate-pulse"></div>
            <div className="w-24 h-6 bg-ecoware-primary-accent/20 rounded-full animate-pulse"></div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2 mb-2">
            <div className="w-full h-6 bg-ecoware-gray-medium rounded animate-pulse"></div>
            <div className="w-3/4 h-6 bg-ecoware-gray-medium rounded animate-pulse"></div>
          </div>

          {/* Excerpt Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="w-full h-4 bg-ecoware-gray-light rounded animate-pulse"></div>
            <div className="w-full h-4 bg-ecoware-gray-light rounded animate-pulse"></div>
            <div className="w-2/3 h-4 bg-ecoware-gray-light rounded animate-pulse"></div>
          </div>

          {/* Read More Link Skeleton */}
          <div className="flex items-center">
            <div className="w-24 h-4 bg-ecoware-primary/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Popular Tags Skeleton Component
const PopularTagsSkeleton: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-ecoware-gray-medium rounded-full animate-pulse"></div>
        <div className="w-24 h-5 bg-ecoware-gray-medium rounded animate-pulse"></div>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Tag Skeletons */}
        {["w-20", "w-16", "w-24", "w-18", "w-22", "w-14", "w-28", "w-16"].map((width, index) => (
          <div
            key={index}
            className={`${width} h-6 bg-ecoware-primary-accent/20 rounded-full animate-pulse`}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
