"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, Facebook, Instagram, Linkedin, Twitter, Zap, AlertCircle, LogOut, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Integration {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: any;
  connected?: boolean;
  handle?: string;
  expired?: boolean;
  accountId?: string;
  accountImage?: string;
}

const integrationsInitial: Integration[] = [
  {
    id: "instagram",
    title: "Connect Instagram",
    description: "Connect your Instagram account to start posting content and manage your content in one place.",
    url: "",
    icon: "/social-media/instagram.png",
  },
  {
    id: "facebook",
    title: "Connect Facebook",
    description: "Connect your Facebook account to start posting content and manage your content in one place.",
    url: "",
    icon: "/social-media/facebook.png",
  },
  {
    id: "twitter",
    title: "Connect Twitter/X",
    description: "Connect your Twitter/X account to start posting content and manage your content in one place.",
    url: "/api/oauth/twitter",
    icon: "/social-media/x.png",
  },
  {
    id: "linkedin",
    title: "Connect LinkedIn",
    description: "Connect your LinkedIn account to start posting content and manage your content in one place.",
    url: "",
    icon: "/social-media/linkedin.png",
  },
];

const FeatureCard = ({ feature, onDisconnect, onDelete }: { feature: Integration; onDisconnect: (id: string, accountId?: string) => void; onDelete: (id: string, accountId?: string) => void }) => (
  <div className="relative overflow-hidden group bg-zinc-100/60 dark:bg-zinc-800/40 backdrop-blur-sm rounded-2xl w-full">
    <div className={`block h-full rounded-2xl border border-zinc-100 dark:border-zinc-700/30 overflow-hidden`}>
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div className={`dark:bg-zinc-800 bg-zinc-200 border border-zinc-100 dark:border-zinc-700/30 rounded-xl backdrop-blur-sm relative`}>
              <Image
                src={feature.accountImage || feature.icon}
                alt={feature.title}
                width={500}
                height={500}
                className="h-12 w-12 object-cover rounded-md"
              />
              {feature.connected && <div className="absolute -top-2 -right-2 bg-green-500 h-4 w-4 rounded-full border-2 border-white dark:border-zinc-800" />}
            </div>
            <div className="flex items-center gap-1">
              {feature.connected ? (
                <div className="flex items-center gap-1 p-1 px-2 rounded-full bg-zinc-200/50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-sm self-start shadow-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDisconnect(feature.id, feature.accountId)}
                    className="h-7 w-7 text-zinc-500 dark:text-zinc-400 hover:text-amber-500 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all duration-200"
                    title="Disconnect"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                  <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700/80 mx-0.5" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(feature.id, feature.accountId)}
                    className="h-7 w-7 text-zinc-500 dark:text-zinc-400 hover:text-red-500 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all duration-200"
                    title="Delete Account"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => feature.url && (window.location.href = feature.url)}
                  disabled={!feature.url}
                  className="h-8 px-4 rounded-full text-sm font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
                >
                  Connect
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent">{feature.title}</h3>
              {feature.connected && (
                <div className="flex items-center gap-2 w-fit px-2.5 py-1 rounded-lg border border-indigo-500/10 bg-indigo-500/5">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-sm text-indigo-600 dark:text-indigo-400">@{feature.handle}</span>
                </div>
              )}
            </div>
            {feature.connected && feature.expired && (
              <span className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-red-500/20 shadow-inner">
                <AlertCircle className="h-3 w-3" /> Broken
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 ">{feature.description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCardSkeleton = () => (
  <div className="relative overflow-hidden bg-zinc-100/60 dark:bg-zinc-800/40 backdrop-blur-sm rounded-2xl w-full animate-pulse">
    <div className="block h-full rounded-2xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-700/50" />
          <div className="w-24 h-9 rounded-lg bg-zinc-200 dark:bg-zinc-700/50" />
        </div>
        <div className="w-3/4 h-6 rounded bg-zinc-200 dark:bg-zinc-700/50 mb-4" />
        <div className="w-[90%] h-4 rounded bg-zinc-200 dark:bg-zinc-700/50 mb-2" />
        <div className="w-full h-4 rounded bg-zinc-200 dark:bg-zinc-700/50 mb-2" />
        <div className="w-5/6 h-4 rounded bg-zinc-200 dark:bg-zinc-700/50" />
      </div>
    </div>
  </div>
);

const Page = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(integrationsInitial);
  const [loading, setLoading] = useState(true);

  const fetchIntegrations = async () => {
    try {
      const res = await fetch("/api/user/integrations");
      if (!res.ok) throw new Error("Failed to fetch");
      const connectedAccounts = await res.json();

      const now = Math.floor(Date.now() / 1000);

      const updated = integrationsInitial.map((base) => {
        const connected = connectedAccounts.find((acc: any) => acc.platform === base.id);
        if (connected) {
          return {
            ...base,
            connected: true,
            accountId: connected.id,
            handle: connected.accountHandle || connected.id,
            accountImage: connected.accountImage,
            // Only mark as truly expired if the accessToken is missing (which happens if refresh fails)
            expired: !connected.accessToken,
          };
        }
        return base;
      });

      setIntegrations(updated);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load integrations");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (provider: string, accountId?: string) => {
    if (!accountId) return;
    try {
      const res = await fetch(`/api/accounts/${accountId}`, {
        method: "PATCH",
        body: JSON.stringify({ action: "disconnect" }),
      });
      if (!res.ok) throw new Error("Failed to disconnect");

      toast.success(`${provider} disconnected successfully`);
      fetchIntegrations();
    } catch (err) {
      toast.error("Failed to disconnect");
    }
  };

  const handleDeleteAccount = async (provider: string, accountId?: string) => {
    if (!accountId) {
      toast.error("Account ID missing");
      return;
    }
    if (!confirm(`Are you sure you want to delete your connected ${provider} account?`)) return;

    try {
      const res = await fetch(`/api/accounts/${accountId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete account");

      toast.success(`${provider} account deleted`);
      fetchIntegrations();
    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  return (
    <div className="min-h-[calc(100vh-100px)] space-y-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 ">
          <h1 className="text-3xl font-black dark:text-white mb-1">Integration Settings</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Connect your social media accounts to automate your content strategy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => <FeatureCardSkeleton key={index} />)
            : integrations.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  onDisconnect={handleDisconnect}
                  onDelete={handleDeleteAccount}
                />
              ))}
        </div>
      </div>

      <div className=" flex flex-col items-end gap-3 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border  dark:border-zinc-600/50 bg-white shadow-sm dark:bg-zinc-900/50 backdrop-blur-md">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </div>
          <span className="text-[10px] font-bold bg-gradient-to-r from-zinc-600 to-zinc-400 dark:from-zinc-400 dark:to-zinc-600 bg-clip-text text-transparent uppercase tracking-[0.2em]">
            More Platforms Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};
export default Page;
