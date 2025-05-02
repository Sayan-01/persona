import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import DashboardHeading from "../_components/dashboard-heading";

interface integration {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

const integrations = [
  {
    title: "Connect Instagram",
    description: "Connect your Instagram account to start posting content and manage your content in one place.",
    url: "",
    icon: (
      <Instagram
        size={60}
        strokeWidth={1.3}
        className="text-[#3352cc]"
      />
    ),
  },
  {
    title: "Connect Facebook",
    description: "Connect your Facebook account to start posting content and manage your content in one place.",
    url: "",
    icon: (
      <Facebook
        size={60}
        strokeWidth={1.3}
        className="text-[#3352cc]"
      />
    ),
  },
  {
    title: "Connect Twitter",
    description: "Connect your Twitter account to start posting content and manage your content in one place.",
    url: "",
    icon: (
      <Twitter
        size={60}
        strokeWidth={1.3}
        className="text-[#3352cc]"
      />
    ),
  },
  {
    title: "Connect LinkedIn",
    description: "Connect your LinkedIn account to start posting content and manage your content in one place.",
    url: "",
    icon: (
      <Linkedin
        size={60}
        strokeWidth={1.3}
        className="text-[#3352cc]"
      />
    ),
  },
];

const page = () => {
  return (
    <div className="py-8">
      <DashboardHeading title="Social Media Integrations" description="Integrate your social media for manage your content etc."/>
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        {integrations.map((item: integration, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-4 border-[#3352cc] bg-[#1c207055]  border-2 p-3 rounded-xl"
          >
            {item.icon}
            <div>
              <h2>{item.title}</h2>
              <p className="text-sm opacity-60">{item.description}</p>
            </div>
            <div className="py-1.5 px-4 rounded-full bg-gradient-to-br hover:opacity-80 from-[#3352cc] to-[#1c2070]">Connect</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
