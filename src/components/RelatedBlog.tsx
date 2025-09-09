import stack from "@/utlis/contentstack-sdk";
import BlogCard from "./common/BlogCard";
import { Blog, Blogs } from "@/types/entries";
import { QueryOperation } from "@contentstack/delivery-sdk";

type RelatedBlogProps = {
  relatedArticles: { uid: string }[];
};

export default async function RelatedBlog({ relatedArticles }: RelatedBlogProps) {
  const query = stack
    .contentType("blog")
    .entry()
    .only(["title", "url", "feature_image", "blog_category", "description", "published_date"])
    .query()
    .where(
      "uid",
      QueryOperation.INCLUDES,
      relatedArticles.map((article) => article.uid)
    );

  const result = await query.find();

  //   console.log("RELATED ARTICLES RESULT :", result);
  const { entries = [] } = result as Blogs;

  return (
    <div className="mt-32">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-ecoware-primary-accent rounded-full"></div>
          <div className="w-2 h-2 bg-ecoware-text-dark rounded-full"></div>
          <div className="w-2 h-2 bg-ecoware-text-dark rounded-full"></div>
        </div>
        <span className="text-ecoware-text-dark text-sm font-medium">Related News & Blogs</span>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-ecoware-text-dark">Latest Related News & Blogs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {entries.map((article) => (
          <BlogCard key={article.uid} {...article} />
        ))}
      </div>
    </div>
  );
}
