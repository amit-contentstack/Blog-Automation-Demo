import { LandingPage } from "@/types/entries";
import { Container } from "./layout";
import { Button, Badge } from "./ui";
import Link from "next/link";
import HeroImageCarousel from "./HeroImageCarousel";
import stack from "@/utils/contentstack-sdk";

const EcoWareHero: React.FC = async () => {
  const landingPageData = await stack
    .contentType("landing_page")
    .entry("blt198749e9228c558e")
    .fetch<LandingPage>();

  const { title, description, hero_image, tagline } = landingPageData;

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Column - Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Subtitle Badge */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ecoware-primary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-ecoware-primary-accent rounded-full"></div>
              </div>
              <Badge variant="primary" className="text-ecoware-text-light">
                {tagline}
              </Badge>
            </div>

            <div>
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-zinc-900 mb-3">
                {title}
              </h1>

              {/* Description */}
              <p className="text-md md:text-lg text-ecoware-gray-dark leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="min-w-[200px] bg-ecoware-primary hover:bg-ecoware-primary-hover text-white group"
              >
                Explore More
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
              <Link href={"/blog"}>
                <Button
                  variant="underline"
                  size="lg"
                  className="min-w-[200px] text-ecoware-primary hover:text-ecoware-primary-accent"
                >
                  Read Our Blog
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <HeroImageCarousel images={hero_image.map((image) => image.url)} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EcoWareHero;
