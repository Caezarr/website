import type {
  AiChatCapabilityClustersData,
  CapabilityGridCard,
} from "@/lib/page-defaults/ai-chat-capability-grid";

const CAPABILITY_IMAGE = {
  width: 3200,
  height: 1800,
  fit: "cover" as const,
};

const WORKSPACE_FEATURE_CARDS: CapabilityGridCard[] = [
  {
    id: "connected-tools",
    title: "Connected to your tools",
    body: "Odoo, SharePoint, Teams and your mailbox.",
    image: {
      src: "/images/workspace/capabilities/connected-to-your-tools.png",
      alt: "Connected to your tools in Wonka Workspace",
      ...CAPABILITY_IMAGE,
    },
  },
  {
    id: "set-up-per-team",
    title: "Set up per team",
    body: "SSO, user management and who reaches what.",
    image: {
      src: "/images/workspace/capabilities/set-up-per-team.png",
      alt: "Team setup in Wonka Workspace",
      ...CAPABILITY_IMAGE,
    },
  },
  {
    id: "human-approves",
    title: "A human approves",
    body: "AI does the work, you sign off before it leaves.",
    image: {
      src: "/images/workspace/capabilities/a-human-approves.png",
      alt: "Human approval in Wonka Workspace",
      ...CAPABILITY_IMAGE,
    },
  },
  {
    id: "your-model-choice",
    title: "Your model, your choice",
    body: "Every leading model, or connect your own.",
    image: {
      src: "/images/workspace/capabilities/your-model-your-choice.png",
      alt: "Choose your AI model in Wonka Workspace",
      width: 4000,
      height: 1800,
      fit: "cover",
    },
  },
  {
    id: "workflow-templates",
    title: "Workflow templates included",
    body: "Fifty processes that already run at other companies.",
    image: {
      src: "/images/workspace/capabilities/workflow-templates-included.png",
      alt: "Workflow templates in Wonka Workspace",
      ...CAPABILITY_IMAGE,
    },
  },
  {
    id: "hosted-in-eu",
    title: "Hosted in the EU",
    body: "Your data stays in Europe and never trains a model.",
    image: {
      src: "/images/workspace/capabilities/hosted-in-the-eu.png",
      alt: "EU hosting in Wonka Workspace",
      ...CAPABILITY_IMAGE,
    },
  },
];

export const WORKSPACE_CAPABILITY_CLUSTERS: AiChatCapabilityClustersData = {
  clusters: [
    {
      heading: "Safe and customized for you.",
      layout: "workspace-features",
      cards: WORKSPACE_FEATURE_CARDS,
    },
  ],
};
