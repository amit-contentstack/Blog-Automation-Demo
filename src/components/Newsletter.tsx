"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Input from "./ui/Input";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(email);
  };
  return (
    <div>
      <h3 className="text-lg font-semibold text-ecoware-primary mb-6">Newsletter</h3>
      <form onSubmit={handleEmailSubmit} className="flex">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-l-full rounded-r-none border-r-0 focus:z-10"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-ecoware-primary hover:bg-ecoware-primary-hover text-ecoware-primary-accent px-4 rounded-r-full flex items-center justify-center transition-colors"
          aria-label="Subscribe to newsletter"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
