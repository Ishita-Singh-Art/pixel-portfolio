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
    location: "Raipur, Chhattisgarh , India",
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
    location: "Raipur, Chhattisgarh , India",
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
    location: "Raipur, Chhattisgarh , India",
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
// PROJECTS — MEDIA FORMATS
//
//   IMAGE (LOCAL — the recommended approach. Place the file in /public/images/):
//     { type: "image", src: "/images/my-artwork.jpg", alt: "Description" }
//     WHY LOCAL: Google Drive hotlinks (both drive.google.com/thumbnail and the
//     lh3.googleusercontent.com CDN) are rate-limited — a page loading many images
//     at once (e.g. the projects list) gets HTTP 429 and broken images. Hosting the
//     files locally in /public/ is reliable and fast. To add a Drive image, download
//     it once (curl -L "https://lh3.googleusercontent.com/d/FILE_ID=w1920" -o file.jpg)
//     and commit it to /public/images/.
//
//   VIDEO (Google Drive — embeds in an iframe):
//     { type: "video", src: "https://drive.google.com/file/d/FILE_ID/preview", title: "Title" }
//
//   TIP: Add multiple image entries to create a browsable carousel.
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
  /** Set true to show this project in the "Featured Work" section on the landing page. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "low-poly-boiler-prop",
    title: "Low-Poly Boiler — Stylized Game Prop",
    category: "3D",
    featured: true,
    tools: ["Autodesk Maya", "Substance Painter"],
    description:
      "A stylized low-poly boiler prop built as a self-contained game-ready asset — designed to sit inside a stylized environment (think cozy cabin, steampunk workshop, or survival-camp scene) without breaking the visual language of low-poly art. The model focuses on clean readable shapes, deliberate silhouette breaks (rivets, exhaust pipe, pressure gauge, valve handle), and a warm hand-painted material treatment that holds up at both close and gameplay camera distances. Topology is kept quads-only and well under 3K triangles so it can be instanced freely in a scene without blowing up draw cost, and the UV layout is atlas-friendly for batching with neighbouring props.",
    challenges:
      "Convincing boiler parts — pipes, rivets, gauge dial, valves, soot weathering — into a very low triangle budget while keeping the silhouette instantly readable, and getting the warm 'stove-lit' feel to read clearly without resorting to baked lighting or heavy normal maps.",
    solution:
      "Blocked the boiler in Blender using primitive shapes first to lock the silhouette, then beveled hard edges by hand instead of adding subdivisions so flat-shaded facets still read as intentional design. Modeled the gauge, valve, and rivets as separate reusable components that snap onto the body via clean pivots. Hand-painted the diffuse in Substance Painter with a tri-tone palette (warm steel, soot-black, ember-orange) and authored a single 512px roughness map with curvature-driven highlights to fake light response — no normal map needed. Final lookdev pass done in Marmoset Toolbag to verify readability under the project's target lighting setup.",
    driveFolder:
      "https://drive.google.com/file/d/1POpdkuqVN6EcoiaJ0IOclv4oUTJkSC-F/view?usp=drive_link",
    media: [
      {
        type: "image",
        src: "/images/boiler-1.jpg",
        alt: "Low-Poly Boiler — Stylized Game Prop",
      },
      {
        type: "image",
        src: "/images/boiler-2.jpg",
        alt: "Low-Poly Boiler — Stylized Game Prop",
      },
    ],
  },
  {
    slug: "old-school-signal-stylized-radio",
    title: "Old School Signal — Stylized Radio",
    category: "3D",
    featured: true,
    tools: ["Autodesk Maya", "Substance Painter"],
    description:
      "A stylized 3D radio prop inspired by classic analog designs, created to capture the charm of retro sound technology in a clean modern art style. This piece focuses on bold shapes, simple forms, and a warm color palette, blending vintage aesthetics with a minimalistic approach. From the mesh grille and chunky knobs to the compact case and handle, every element is built with clean topology suitable for games or animated scenes. The model emphasizes readability, silhouette clarity, and a polished presentation while keeping the overall design lightweight and stylized. Created as a practice piece for hard-surface modeling, stylized shading, and prop design workflows.",
    challenges:
      "Achieving a stylized look that reads as 'retro' without relying on realistic wear-and-tear — keeping the shapes bold and the materials clean while still evoking the warmth and charm of vintage audio gear.",
    solution:
      "Blocked out the primary forms first to nail the silhouette, then refined each component (grille, knobs, handle, case) with beveled edges and exaggerated proportions for readability. Used Substance Painter's stylized shading workflow with flat base colors, subtle curvature-driven gradients, and a hand-painted roughness map to give the metal and plastic surfaces a warm, tactile feel without photorealistic noise. Final presentation rendered in Marmoset Toolbag with a soft three-point lighting setup to highlight the model's form and material separation.",
    driveFolder:
      "https://drive.google.com/drive/folders/19OaYxkxotZhsF2HcSafY2YIOZq89qwcd?usp=sharing",
    media: [
      {
        type: "image",
        src: "/images/radio-1.png",
        alt: "3D Portfolio — Drive Folder",
      },
      {
        type: "image",
        src: "/images/radio-2.png",
        alt: "3D Portfolio — Drive Folder",
      },
      {
        type: "image",
        src: "/images/radio-3.png",
        alt: "3D Portfolio — Drive Folder",
      },
      {
        type: "image",
        src: "/images/radio-4.png",
        alt: "3D Portfolio — Drive Folder",
      },
    ],
  },
  {
    slug: "low-poly-tank-mobile",
    title: "Low-Poly Tank — Mobile Game Asset",
    category: "3D",
    featured: true,
    tools: ["AutoDesk Maya", "Arnold", "Unity"],
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
    featured: true,
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
        src: "https://drive.google.com/file/d/1PuQiWPat0MSPlYDaN6i7IFV-I7aHYdh4/preview",
        title: "2D Cat Character — Spine Animation",
      },
    ],
  },

  {
    slug: "2d-illustrations-canvas",
    title: "2D Illustrations & Canvas Paintings",
    category: "2D",
    featured: true,
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
        type: "image",
        src: "/images/illustration-1.jpg",
        alt: "2D Illustration — Artwork 1",
      },
      {
        type: "image",
        src: "/images/illustration-2.jpg",
        alt: "2D Illustration — Artwork 2",
      },
      {
        type: "image",
        src: "/images/illustration-3.jpg",
        alt: "Canvas Painting — Artwork 3",
      },
      {
        type: "image",
        src: "/images/illustration-4.jpg",
        alt: "Canvas Painting — Artwork 4",
      },
    ],
  },
];
