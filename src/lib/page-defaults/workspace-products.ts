export interface WorkspaceProductCard {
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface WorkspaceProductsData {
  heading: string;
  body: string | null;
  products: WorkspaceProductCard[];
}

export const WORKSPACE_PRODUCTS: WorkspaceProductsData = {
  heading: "Explore Wonka Workspace.",
  body: null,
  products: [
    {
      title: "AI Chat",
      body: "Chat with your data, safely.",
      href: "/workspace/ai-chat",
      ctaLabel: "Discover AI Chat",
      image: {
        src: "/images/workspace/features/ai-chat-feature.png",
        alt: "AI Chat in Wonka Workspace",
      },
    },
    {
      title: "AI Agents",
      body: "Delegate recurring tasks to AI.",
      image: {
        src: "/images/workspace/features/ai-agents-feature.png",
        alt: "AI Agents in Wonka Workspace",
      },
    },
  ],
};
