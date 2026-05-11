// ─────────────────────────────────────────────────────────────────────────────
// SKILL ICON MAP
// To add/change an icon for a tool, just add an entry below.
// `slug` refers to a Simple Icons slug (https://simpleicons.org).
// The icon is loaded from https://cdn.simpleicons.org/<slug>
// If a tool has no entry (or the icon fails to load), a default wrench icon
// is shown automatically — so you can leave items without icons safely.
// ─────────────────────────────────────────────────────────────────────────────

export const skillIconMap: Record<string, { slug: string }> = {
  // 3D Tools
  "Autodesk Maya": { slug: "autodeskmaya" },
  ZBrush: { slug: "maxon" },
  "Substance Painter": { slug: "adobe" },
  Blender: { slug: "blender" },
  "3ds Max": { slug: "autodesk" },

  // 2D Tools
  "Adobe Photoshop": { slug: "adobephotoshop" },
  "Clip Studio": { slug: "clipstudiopaint" },
  Procreate: { slug: "procreate" },
  Pencil2D: { slug: "pencil2d" },
  "Animate CC": { slug: "adobeanimate" },

  // Other
  "Spine (2D Animation)": { slug: "esotericsoftware" },
  "C++": { slug: "cplusplus" },
  Python: { slug: "python" },
  "Visual Studio": { slug: "visualstudio" },
  Unity: { slug: "unity" },
};
