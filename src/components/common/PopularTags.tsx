import React from "react";
import Badge from "../ui/Badge";
import stack from "@/utlis/contentstack-sdk";
import { TagsField } from "@/types/entries";

interface PopularTagsProps {
  className?: string;
}

const PopularTags = async ({ className = "" }: PopularTagsProps) => {
  let tags: string[] = [];

  try {
    // Fetch popular tags from Contentstack global field
    const result = await stack.globalField("blog_category").fetch<TagsField>();

    // console.log("RESULT :", result);

    tags = result.schema[0].enum.choices.map((choice) => choice.value) || [];
  } catch (error) {
    console.error("Error fetching popular tags:", error);
    // Fallback tags if API call fails
    tags = [
      "Sustainable Packaging",
      "Eco-Friendly Solutions",
      "Green Technology",
      "Waste Reduction",
      "Circular Economy",
      "Biodegradable Materials",
      "Carbon Footprint",
      "Environmental Impact",
    ];
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-ecoware-primary-accent rounded-full"></div>
        <h3 className="text-lg font-medium text-ecoware-text-dark">Popular Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" size="sm" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
