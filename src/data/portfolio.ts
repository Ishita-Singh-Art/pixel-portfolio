// ─────────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO CONTENT
// All site content lives here so you can change text, projects, links, etc.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Ishita Singh",
  title: "3D / 2D Game Artist",
  tagline:
    "Crafting game-ready 3D assets, stylized characters, and painterly worlds — from concept to PBR-finished render.",
  location: "Raipur, India",
  email: "ishitasingh151202@gmail.com",
  phone: "+91 7471167973",
  linkedin: "https://www.linkedin.com/in/ishita-singh-2a9769240",
  artstation: "https://www.artstation.com/",
  drivePortfolio:
    "https://drive.google.com/drive/folders/19OaYxkxotZhsF2HcSafY2YIOZq89qwcd?usp=sharing",
  resumeFile: "/IshitaSingh_Resume.pdf",
};

export const experiences = [
  {
    role: "3D / 2D Artist (Freelance)",
    company: "Freelance",
    period: "March 2025 – Present",
    location: "Raipur, India",
    points: [
      "Created a high-quality 3D chair model that increased client engagement by 30%.",
      "Designed and animated a 2D cat character for a game using Spine.",
      "Produced a 3D low-poly tank asset optimized for a mobile game.",
      "Created and sold custom canvas paintings to clients.",
    ],
  },
  {
    role: "3D / 2D Faculty",
    company: "Arena Animation",
    period: "April 2024 – March 2025",
    location: "Bhilai ,Chhattisgarh , India",
    points: [
      "Delivered 100+ sessions on 3D modeling, texturing, and animation.",
      "Trained students in Maya, 3ds Max, ZBrush, and Substance Painter.",
      "Guided students in character design, VFX, and animation workflows.",
      "Mentored students in creativity, storytelling, and technical skills.",
    ],
  },
  {
    role: "3D Faculty",
    company: "Shubhkamna Institute",
    period: "May 2023 – March 2024",
    location: "Raipur, India",
    points: [
      "Delivered 50+ sessions in 3D modeling, lighting, and texturing using Maya.",
      "Conducted 60+ sessions in digital sculpting using ZBrush.",
      "Taught 100+ sessions on concept art, illustration, and texturing.",
      "Collaborated on 5+ short film projects in animation pipelines.",
    ],
  },
];

export const education = [
  {
    school: "SSIPMT Raipur",
    degree: "B.Tech in Computer Science Engineering",
    period: "Nov 2020 – Aug 2024",
  },
  {
    school: "Shubhkamna Institute",
    degree: "Certificate in 3D Art",
    period: "July 2022 – April 2023",
  },
  {
    school: "Bhartiya Charukala Mandir",
    degree: "Diploma in Fine Arts",
    period: "July 2015 – July 2020",
  },
];

export const skillGroups = [
  {
    title: "3D Tools",
    items: ["Autodesk Maya", "ZBrush", "Substance Painter", "Blender", "3ds Max"],
  },
  {
    title: "2D Tools",
    items: ["Adobe Photoshop", "Clip Studio", "Procreate", "Pencil2D", "Animate CC"],
  },
  {
    title: "Specializations",
    items: [
      "3D Modeling",
      "Texturing",
      "Digital Sculpting",
      "UV Mapping",
      "PBR Workflows",
      "Asset Optimization",
    ],
  },
  {
    title: "Other",
    items: ["Spine (2D Animation)", "C++", "Python", "Visual Studio"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// To add a project: copy a block, update fields. `media` items can be:
//   { type: "image", src: "https://drive.google.com/uc?export=view&id=FILE_ID" }
//   { type: "video", src: "https://drive.google.com/file/d/FILE_ID/preview" }
// For a Drive image, use the "uc?export=view&id=FILE_ID" form.
// For a Drive video, use the "/preview" form (it embeds in an iframe).
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; title?: string };

export type Project = {
  slug: string;
  title: string;
  category: "3D" | "2D";
  tools: string[];
  description: string;
  challenges: string;
  solution: string;
  driveFolder?: string;
  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: "3d-chair-product-viz",
    title: "High-Quality 3D Chair — Product Visualization",
    category: "3D",
    tools: ["Autodesk Maya", "Substance Painter", "Arnold"],
    description:
      "A photorealistic 3D chair model created for a client's product visualization, focused on clean topology, accurate materials, and studio lighting.",
    challenges:
      "Balancing high visual fidelity with manageable poly-count, while matching the exact fabric and wood textures the client referenced.",
    solution:
      "Built a clean subdivision-ready base mesh in Maya, baked high-to-low normal details, and authored PBR materials in Substance Painter. Final render in Arnold with a 3-point studio HDRI setup boosted client engagement by 30%.",
    driveFolder:
      "https://drive.google.com/drive/folders/19OaYxkxotZhsF2HcSafY2YIOZq89qwcd?usp=sharing",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/embeddedfolderview?id=19OaYxkxotZhsF2HcSafY2YIOZq89qwcd#grid",
        title: "3D Portfolio — Drive Folder",
      },
    ],
  },
  {
    slug: "low-poly-tank-mobile",
    title: "Low-Poly Tank — Mobile Game Asset",
    category: "3D",
    tools: ["Blender", "Substance Painter", "Unity"],
    description:
      "Stylized low-poly tank asset designed for a mobile game, optimized for real-time rendering on lower-end devices.",
    challenges:
      "Keeping the silhouette readable and recognizable at very low triangle counts while staying within a tight texture-memory budget.",
    solution:
      "Designed a clean low-poly silhouette first, packed multiple parts into a single 1K texture atlas, and used hand-painted shading to fake volume — keeping draw calls and memory minimal.",
    driveFolder:
      "https://drive.google.com/drive/folders/19OaYxkxotZhsF2HcSafY2YIOZq89qwcd?usp=sharing",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/embeddedfolderview?id=19OaYxkxotZhsF2HcSafY2YIOZq89qwcd#grid",
        title: "3D Portfolio — Drive Folder",
      },
    ],
  },
  {
    slug: "2d-cat-spine-animation",
    title: "2D Cat Character — Spine Animation",
    category: "2D",
    tools: ["Photoshop", "Spine"],
    description:
      "A playful 2D cat character designed and rigged for a game, featuring idle, walk, and reaction animations using Spine's skeletal system.",
    challenges:
      "Making the character feel alive and bouncy while keeping the rig light enough for smooth performance inside the game engine.",
    solution:
      "Designed the character in modular pieces in Photoshop, built a clean Spine skeleton with mesh deformation only where needed, and used squash-and-stretch curves to give the animations a snappy, charming feel.",
    driveFolder:
      "https://drive.google.com/drive/folders/1CZHhhwy23IHmlCe2H8BrzZZt6196p39B?usp=sharing",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/embeddedfolderview?id=1CZHhhwy23IHmlCe2H8BrzZZt6196p39B#grid",
        title: "2D Portfolio — Drive Folder",
      },
    ],
  },
  {
    slug: "2d-illustrations-canvas",
    title: "2D Illustrations & Canvas Paintings",
    category: "2D",
    tools: ["Procreate", "Clip Studio", "Traditional"],
    description:
      "A collection of 2D illustrations and original canvas paintings sold to clients — exploring color, mood, and storytelling.",
    challenges:
      "Translating the depth and texture of physical paintings into a consistent digital portfolio style that still feels handcrafted.",
    solution:
      "Developed a personal painterly workflow combining traditional underpainting techniques with digital glazing in Procreate, keeping brush economy and palette discipline.",
    driveFolder:
      "https://drive.google.com/drive/folders/1CZHhhwy23IHmlCe2H8BrzZZt6196p39B?usp=sharing",
    media: [
      {
        type: "video",
        src: "https://drive.google.com/embeddedfolderview?id=1CZHhhwy23IHmlCe2H8BrzZZt6196p39B#grid",
        title: "2D Portfolio — Drive Folder",
      },
    ],
  },
];
