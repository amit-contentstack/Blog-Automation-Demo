import React from "react";
import Link from "next/link";
import Container from "./Container";
import Button from "../ui/Button";

import Image from "next/image";
import Newsletter from "../Newsletter";
import stack from "@/utils/contentstack-sdk";
import { Footer as FooterType } from "@/types/entries";

const Footer: React.FC = async () => {
  const footer = await stack.contentType("footer").entry("bltfc4e95f0d0a86780").fetch<FooterType>();

  const { title, description, social_links, navigation_links, contact_info } = footer;

  return (
    <footer className="bg-white py-28">
      <Container>
        {/* Header Section */}
        <div className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-ecoware-text-dark mb-4 md:mb-0">
              {title}
            </h2>
            <Button
              variant="primary"
              size="lg"
              className="bg-ecoware-primary hover:bg-ecoware-primary-hover text-ecoware-primary-accent px-8 py-3 rounded-full"
            >
              Contact Us
            </Button>
          </div>

          {/* Separator Line */}
          <div className="w-full h-px bg-ecoware-gray-medium mb-8"></div>
        </div>

        {/* Main Footer Content */}
        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Brand Section */}
          <div className="grow pr-16">
            <div className="flex items-center mb-2">
              <div className="h-[36px] w-[36px] rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo-icon-1.png"
                  alt="EcoWare Solutions"
                  width={40}
                  height={40}
                  className="object-fill object-center"
                />
              </div>
              <h3 className="text-2xl font-semibold text-ecoware-primary ml-2">
                Ecoware Solutions <span className="text-ecoware-primary-accent">.</span>
              </h3>
            </div>

            <p className="text-zinc-400 mb-8 max-w-sm">{description}</p>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {social_links.social_media_share.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.title}
                    href={social.url.href}
                    className={`w-10 h-10 bg-ecoware-primary-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform`}
                    aria-label={social.title}
                  >
                    <Image
                      src={IconComponent.url}
                      alt={social.title}
                      width={20}
                      height={20}
                      className="w-5 h-5 text-ecoware-primary"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex gap-16 flex-wrap ">
            {/* Navigation Section */}
            <div className="">
              <h3 className="text-lg font-semibold text-ecoware-primary mb-6">Navigation</h3>
              <ul className="space-y-4">
                {navigation_links.links.map((link) => (
                  <li key={link.link_title}>
                    <Link
                      href={link.link_url.href}
                      className="text-zinc-400 hover:text-ecoware-primary transition-colors"
                    >
                      {link.link_title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-ecoware-primary mb-6">Contact</h3>
                <div className="space-y-3 text-zinc-400">
                  <p>{contact_info.details.email}</p>
                  <p>{contact_info.details.contact_number}</p>
                  <p className="leading-relaxed line-clamp-2">
                    {contact_info.details.company_address}
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <Newsletter />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
