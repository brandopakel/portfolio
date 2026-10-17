export interface Project {
  title: string;
  year: string;
  description: string;
  stack: string[];
  links: {
    label: string;
    href: string;
  }[];
}

const gh = (repo: string) => `https://github.com/brandopakel/${repo}`;

export const projects: Project[] = [
  {
    title: "AgentDocker",
    year: "2026",
    description:
      "Docker-style orchestration for AI coding agents. A daemon, CLI, and desktop app that let Claude Code, Codex, Gemini CLI, and Cursor share one machine without colliding.",
    stack: ["Rust", "SQLite", "MCP"],
    links: [{ label: "GitHub", href: gh("AgentDocker") }],
  },
  {
    title: "keel",
    year: "2026",
    description:
      "In-memory cache and analytics service that speaks the Redis protocol, with probabilistic sketches, AOF persistence, and LRU/LFU eviction.",
    stack: ["Go", "RESP", "epoll/kqueue"],
    links: [{ label: "GitHub", href: gh("keel") }],
  },
  {
    title: "Omnivest",
    year: "2026",
    description:
      "Local-first research platform spanning five languages, from data ingestion through ML training and live execution.",
    stack: ["Go", "Rust", "Python", "C++", "OCaml"],
    links: [
      { label: "Website", href: "https://omnivest.io/" },
      { label: "Architecture", href: gh("omnivest-architecture") },
    ],
  },
  {
    title: "GoGIF",
    year: "2026",
    description:
      "Makes or finds the right GIF from one prompt, across local rendering, open media archives, and hosted generation.",
    stack: ["Go", "ComfyUI", "FFmpeg"],
    links: [{ label: "GitHub", href: gh("gogifgenerator") }],
  },
  {
    title: "Portlight Desktop",
    year: "2026",
    description:
      "Windows catalog and launcher built on Overdrive, packaged in Electron with AnyPS5 integration.",
    stack: ["TypeScript", "Electron", "React"],
    links: [{ label: "GitHub", href: gh("portlight-desktop") }],
  },
  {
    title: "Minecraft bridge",
    year: "2026",
    description:
      "Local bridge that drives a Minecraft bot player through file-based commands, with no network listener.",
    stack: ["JavaScript", "Node.js", "Scarpet"],
    links: [{ label: "GitHub", href: gh("remy-minecraft-bridge") }],
  },
  {
    title: "hubspot-clean",
    year: "2026",
    description:
      "CLI that audits HubSpot contacts for duplicates, incomplete records, and stale data, with dry-run fixes.",
    stack: ["Python", "CLI"],
    links: [{ label: "GitHub", href: gh("hubspot-clean") }],
  },
  {
    title: "RingLead merge QA",
    year: "2026",
    description:
      "Triages deduplication exports so only groups that need a person get reviewed. Cut one review from 460 groups to 222.",
    stack: ["Python", "pytest"],
    links: [{ label: "GitHub", href: gh("ringlead-dedup-review") }],
  },
  {
    title: "K-Means Visualizer",
    year: "2025",
    description:
      "Pick a dataset and k, then watch centroids move and assignments flip one iteration at a time.",
    stack: ["TypeScript", "React", "Flask"],
    links: [
      { label: "Live demo", href: "https://k-means-visualization.vercel.app/" },
      { label: "GitHub", href: gh("k-means-visualization") },
    ],
  },
  {
    title: "BitTorrent client",
    year: "2022",
    description:
      "Written from the protocol up with no torrent libraries: bencode, UDP tracker, and the peer wire protocol.",
    stack: ["JavaScript", "Node.js"],
    links: [{ label: "GitHub", href: gh("JSBitTorrentClient") }],
  },
  {
    title: "Python 3D renderer",
    year: "2022",
    description: "Minimal OpenGL viewer: window, camera, and mesh rendering.",
    stack: ["Python", "OpenGL"],
    links: [{ label: "GitHub", href: gh("Python3DRenderer") }],
  },
];

export const archive: { title: string; href: string }[] = [
  { title: "NeetCode solutions", href: gh("neetcode-submissions") },
  { title: "Python data structures and algorithms", href: gh("Python-Data-Structure-and-Algorithm-Practice") },
  { title: "Proof-of-work blockchain in JavaScript", href: gh("sampleblockchainJS") },
  { title: "NFT marketplace", href: gh("Amative-NFT-Marketplace") },
  { title: "Ethereum fundraiser dApp", href: gh("EthFundraiserPracticeDApp") },
  { title: "First React app", href: gh("reactstaticapp1") },
];
