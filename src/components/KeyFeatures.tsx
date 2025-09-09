import React from "react";
import { Container, Section } from "./layout";
import stack from "@/utlis/contentstack-sdk";
import { KeyFeatures as KeyFeaturesType } from "@/types/entries";

const KeyFeatures: React.FC = async () => {
  const keyFeaturesData = await stack
    .contentType("key_features")
    .entry("blt63e29947a05e434a")
    .fetch<KeyFeaturesType>();

  const { title, feature_description, features } = keyFeaturesData;

  // console.log(keyFeaturesData);

  return (
    <Section className="bg-ecoware-gray-light py-28">
      <Container>
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-24">
          <div>
            {/* Small Icon */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-ecoware-primary-accent rounded-full"></div>
                <div className="w-4 h-4 bg-ecoware-primary rounded-full"></div>
                <div className="w-4 h-4 bg-ecoware-text-dark rounded-full"></div>
              </div>
              <span className="text-ecoware-text-dark font-medium text-sm">Our Work Process</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-semibold text-ecoware-text-dark leading-tight">
              {title}
            </h2>
          </div>

          {/* Description */}
          <div className="lg:pt-8">
            <p className="text-lg text-ecoware-gray-dark leading-relaxed">{feature_description}</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Card Content */}
              <div className="p-8 pb-6">
                {/* Emoji Icon */}
                <div className="mb-6">
                  <img
                    src={feature.feature_icon?.url}
                    alt={feature.feature_name}
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-semibold text-ecoware-text-dark mb-4 leading-tight">
                  {feature.feature_name}
                </h3>

                {/* Feature Description */}
                <p className="text-ecoware-gray-dark leading-relaxed text-sm">
                  {feature.feature_details}
                </p>
              </div>

              {/* Step Banner */}
              <div className="bg-ecoware-primary px-8 py-4 flex items-center justify-between">
                <span className="text-white font-semibold text-sm tracking-wide">STEP</span>
                <span className="text-ecoware-primary-accent font-bold text-lg">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default KeyFeatures;
