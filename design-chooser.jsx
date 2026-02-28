import { useState, useEffect } from "react";

const THEMES = [
  {
    id: "midnight-gold", name: "Midnight Gold", cat: "Dark",
    colors: { bg: "#0f0f13", bgCard: "#1a1a24", bgHover: "#22223a", text: "#e8e6e1", textMuted: "#8a8793", accent: "#d4a847", accentHover: "#e0b85a", accentSoft: "rgba(212,168,71,0.1)", border: "#2a2a3a", inputBg: "#14141e", shadow: "rgba(0,0,0,0.4)" },
    fonts: { heading: "'Playfair Display'", body: "'Source Sans 3'" }
  },
  {
    id: "arctic-blue", name: "Arctic Blue", cat: "Light",
    colors: { bg: "#f0f4f8", bgCard: "#ffffff", bgHover: "#e8eef5", text: "#1a2332", textMuted: "#6b7d93", accent: "#2563eb", accentHover: "#1d4ed8", accentSoft: "rgba(37,99,235,0.07)", border: "#dce4ee", inputBg: "#f8fafc", shadow: "rgba(0,0,0,0.06)" },
    fonts: { heading: "'DM Sans'", body: "'Nunito'" }
  },
  {
    id: "forest-ember", name: "Forest Ember", cat: "Dark",
    colors: { bg: "#131a13", bgCard: "#1b261b", bgHover: "#243024", text: "#dce5d8", textMuted: "#7d9172", accent: "#e06c45", accentHover: "#e8825e", accentSoft: "rgba(224,108,69,0.1)", border: "#2a3a2a", inputBg: "#161e16", shadow: "rgba(0,0,0,0.45)" },
    fonts: { heading: "'Bitter'", body: "'Karla'" }
  },
  {
    id: "lavender-dream", name: "Lavender Dream", cat: "Light",
    colors: { bg: "#f6f4fb", bgCard: "#ffffff", bgHover: "#eee8f6", text: "#2d2640", textMuted: "#8678a0", accent: "#7c3aed", accentHover: "#6d28d9", accentSoft: "rgba(124,58,237,0.07)", border: "#e0d8ec", inputBg: "#faf8fd", shadow: "rgba(0,0,0,0.05)" },
    fonts: { heading: "'Sora'", body: "'Outfit'" }
  },
  {
    id: "tokyo-neon", name: "Tokyo Neon", cat: "Dark",
    colors: { bg: "#0a0a14", bgCard: "#111120", bgHover: "#1a1a35", text: "#eaf0ff", textMuted: "#6670a0", accent: "#ff3d8b", accentHover: "#ff5a9e", accentSoft: "rgba(255,61,139,0.08)", border: "#1e1e38", inputBg: "#0e0e1a", shadow: "rgba(0,0,0,0.5)" },
    fonts: { heading: "'Orbitron'", body: "'Exo 2'" }
  },
  {
    id: "warm-sand", name: "Warm Sand", cat: "Light",
    colors: { bg: "#f8f4ee", bgCard: "#fffdf8", bgHover: "#f0e8da", text: "#3d2e1e", textMuted: "#9a8670", accent: "#c46832", accentHover: "#a85628", accentSoft: "rgba(196,104,50,0.07)", border: "#e6ddd0", inputBg: "#fcf9f4", shadow: "rgba(0,0,0,0.05)" },
    fonts: { heading: "'Fraunces'", body: "'Lora'" }
  },
  {
    id: "mono-terminal", name: "Mono Terminal", cat: "Dark",
    colors: { bg: "#111111", bgCard: "#1a1a1a", bgHover: "#252525", text: "#e0e0e0", textMuted: "#777777", accent: "#00d17a", accentHover: "#00e88a", accentSoft: "rgba(0,209,122,0.08)", border: "#2a2a2a", inputBg: "#151515", shadow: "rgba(0,0,0,0.5)" },
    fonts: { heading: "'JetBrains Mono'", body: "'IBM Plex Mono'" }
  },
  {
    id: "ocean-teal", name: "Ocean Teal", cat: "Light",
    colors: { bg: "#eef6f6", bgCard: "#ffffff", bgHover: "#dceeed", text: "#183434", textMuted: "#5f8a8a", accent: "#0d9488", accentHover: "#0f766e", accentSoft: "rgba(13,148,136,0.07)", border: "#cfe2e1", inputBg: "#f5fafa", shadow: "rgba(0,0,0,0.05)" },
    fonts: { heading: "'Lexend'", body: "'Plus Jakarta Sans'" }
  },
  {
    id: "rose-noir", name: "Rosé Noir", cat: "Dark",
    colors: { bg: "#13090e", bgCard: "#1e1018", bgHover: "#2a1822", text: "#f0dfe6", textMuted: "#9a7888", accent: "#e8587a", accentHover: "#f06e8e", accentSoft: "rgba(232,88,122,0.1)", border: "#301825", inputBg: "#170c12", shadow: "rgba(0,0,0,0.5)" },
    fonts: { heading: "'Cormorant Garamond'", body: "'Raleway'" }
  },
  {
    id: "slate-copper", name: "Slate & Copper", cat: "Dark",
    colors: { bg: "#141618", bgCard: "#1c1f23", bgHover: "#262a30", text: "#e2e0dd", textMuted: "#848890", accent: "#c67a4a", accentHover: "#d48b5e", accentSoft: "rgba(198,122,74,0.1)", border: "#2c3038", inputBg: "#181a1e", shadow: "rgba(0,0,0,0.45)" },
    fonts: { heading: "'Libre Baskerville'", body: "'Figtree'" }
  },
  {
    id: "sage-cream", name: "Sage & Cream", cat: "Light",
    colors: { bg: "#f5f3ee", bgCard: "#fefdfb", bgHover: "#eae6dc", text: "#2c3028", textMuted: "#7a806e", accent: "#5a7a5a", accentHover: "#4a6a4a", accentSoft: "rgba(90,122,90,0.08)", border: "#ddd9ce", inputBg: "#faf8f4", shadow: "rgba(0,0,0,0.04)" },
    fonts: { heading: "'Newsreader'", body: "'Nunito Sans'" }
  },
  {
    id: "deep-indigo", name: "Deep Indigo", cat: "Dark",
    colors: { bg: "#0c0e1a", bgCard: "#141728", bgHover: "#1c2038", text: "#e4e6f0", textMuted: "#7880a8", accent: "#6366f1", accentHover: "#818cf8", accentSoft: "rgba(99,102,241,0.1)", border: "#232840", inputBg: "#101322", shadow: "rgba(0,0,0,0.5)" },
    fonts: { heading: "'Space Grotesk'", body: "'Manrope'" }
  },
  {
    id: "peach-blossom", name: "Peach Blossom", cat: "Light",
    colors: { bg: "#fdf6f2", bgCard: "#ffffff", bgHover: "#faeee6", text: "#3a2520", textMuted: "#a0807a", accent: "#d4654a", accentHover: "#c0523a", accentSoft: "rgba(212,101,74,0.07)", border: "#f0ddd5", inputBg: "#fdf9f6", shadow: "rgba(0,0,0,0.04)" },
    fonts: { heading: "'Crimson Pro'", body: "'Atkinson Hyperlegible'" }
  },
  {
    id: "nordic-frost", name: "Nordic Frost", cat: "Light",
    colors: { bg: "#f2f4f6", bgCard: "#ffffff", bgHover: "#e6eaee", text: "#1e2a36", textMuted: "#6e808f", accent: "#3074a0", accentHover: "#266490", accentSoft: "rgba(48,116,160,0.07)", border: "#d8dee6", inputBg: "#f7f9fa", shadow: "rgba(0,0,0,0.05)" },
    fonts: { heading: "'Geologica'", body: "'Work Sans'" }
  },
  {
    id: "obsidian-amber", name: "Obsidian Amber", cat: "Dark",
    colors: { bg: "#0e0d0b", bgCard: "#1a1815", bgHover: "#262320", text: "#e8e4dc", textMuted: "#908878", accent: "#e09830", accentHover: "#eca840", accentSoft: "rgba(224,152,48,0.1)", border: "#2e2a24", inputBg: "#141310", shadow: "rgba(0,0,0,0.5)" },
    fonts: { heading: "'Bodoni Moda'", body: "'Figtree'" }
  },
  {
    id: "cloud-mint", name: "Cloud Mint", cat: "Light",
    colors: { bg: "#f2f8f6", bgCard: "#ffffff", bgHover: "#e4f0ec", text: "#1a302a", textMuted: "#618878", accent: "#2aa07a", accentHover: "#228866", accentSoft: "rgba(42,160,122,0.07)", border: "#d2e6de", inputBg: "#f6fbf9", shadow: "rgba(0,0,0,0.04)" },
    fonts: { heading: "'Bricolage Grotesque'", body: "'Red Hat Display'" }
  },
  {
    id: "carbon-electric", name: "Carbon Electric", cat: "Dark",
    colors: { bg: "#101014", bgCard: "#18181e", bgHover: "#222230", text: "#e6e8f0", textMuted: "#7478a0", accent: "#4f8ff7", accentHover: "#6ba3ff", accentSoft: "rgba(79,143,247,0.1)", border: "#26263a", inputBg: "#131318", shadow: "rgba(0,0,0,0.5)" },
    fonts: { heading: "'Archivo Black'", body: "'Be Vietnam Pro'" }
  },
  {
    id: "parchment-ink", name: "Parchment & Ink", cat: "Light",
    colors: { bg: "#f4f1ea", bgCard: "#faf8f3", bgHover: "#eae5da", text: "#1c1a16", textMuted: "#7a756a", accent: "#3a3530", accentHover: "#2a2520", accentSoft: "rgba(58,53,48,0.07)", border: "#ddd8cc", inputBg: "#f8f6f0", shadow: "rgba(0,0,0,0.04)" },
    fonts: { heading: "'Literata'", body: "'Spectral'" }
  },
  {
    id: "aurora-violet", name: "Aurora Violet", cat: "Dark",
    colors: { bg: "#0e0a14", bgCard: "#161120", bgHover: "#201830", text: "#e6e0f2", textMuted: "#8a80a8", accent: "#a855f7", accentHover: "#bc78ff", accentSoft: "rgba(168,85,247,0.1)", border: "#281e3e", inputBg: "#120e1a", shadow: "rgba(0,0,0,0.5)" },
    fonts: { heading: "'Urbanist'", body: "'Poppins'" }
  },
  {
    id: "dune-sunset", name: "Dune Sunset", cat: "Light",
    colors: { bg: "#f9f4ee", bgCard: "#fffcf7", bgHover: "#f0e8dc", text: "#32261a", textMuted: "#967a5e", accent: "#b85c38", accentHover: "#a04e2e", accentSoft: "rgba(184,92,56,0.07)", border: "#e8ddd0", inputBg: "#fcf9f4", shadow: "rgba(0,0,0,0.04)" },
    fonts: { heading: "'Gilda Display'", body: "'Jost'" }
  },
];

const BUTTON_STYLES = [
  { id: "solid", name: "Solid", radius: "8px", border: "none", shadow: "none", style: "filled" },
  { id: "outline", name: "Outline", radius: "8px", border: "2px solid", shadow: "none", style: "outlined" },
  { id: "ghost", name: "Ghost", radius: "8px", border: "none", shadow: "none", style: "ghost" },
  { id: "pill", name: "Pill", radius: "999px", border: "none", shadow: "none", style: "filled" },
  { id: "pill-outline", name: "Pill Outline", radius: "999px", border: "2px solid", shadow: "none", style: "outlined" },
  { id: "sharp", name: "Sharp", radius: "0px", border: "none", shadow: "none", style: "filled" },
  { id: "soft", name: "Soft", radius: "12px", border: "none", shadow: "none", style: "soft" },
  { id: "brutalist", name: "Brutalist", radius: "0px", border: "3px solid", shadow: "4px 4px 0", style: "brutalist" },
  { id: "elevated", name: "Elevated", radius: "10px", border: "none", shadow: "0 4px 14px", style: "elevated" },
  { id: "gradient", name: "Gradient", radius: "10px", border: "none", shadow: "none", style: "gradient" },
];

const INPUT_STYLES = [
  { id: "underline", name: "Underline" },
  { id: "boxed", name: "Boxed" },
  { id: "filled", name: "Filled" },
  { id: "floating", name: "Floating Label" },
  { id: "pill", name: "Pill" },
];

const CARD_STYLES = [
  { id: "flat", name: "Flat", desc: "No shadow, border only" },
  { id: "elevated", name: "Elevated", desc: "Subtle shadow, no border" },
  { id: "glass", name: "Glass", desc: "Frosted glass effect" },
  { id: "bordered-accent", name: "Accent Border", desc: "Top accent stripe" },
  { id: "inset", name: "Inset", desc: "Recessed, sunken depth" },
];

function getButtonCSS(btn, theme, state = "default") {
  const c = theme.colors;
  const base = {
    borderRadius: btn.radius,
    fontFamily: `${theme.fonts.body}, sans-serif`,
    fontWeight: 600,
    fontSize: "0.88rem",
    padding: "10px 24px",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.01em",
    display: "inline-block",
  };
  if (btn.style === "filled") return { ...base, background: state === "hover" ? c.accentHover : c.accent, color: "#fff", border: btn.border === "none" ? "none" : `${btn.border} ${c.accent}`, boxShadow: "none" };
  if (btn.style === "outlined") return { ...base, background: state === "hover" ? c.accentSoft : "transparent", color: c.accent, border: `${btn.border} ${c.accent}`, boxShadow: "none" };
  if (btn.style === "ghost") return { ...base, background: state === "hover" ? c.accentSoft : "transparent", color: c.accent, border: "none", boxShadow: "none" };
  if (btn.style === "soft") return { ...base, background: state === "hover" ? c.accent : c.accentSoft, color: state === "hover" ? "#fff" : c.accent, border: "none", boxShadow: "none" };
  if (btn.style === "brutalist") {
    const isDark = theme.cat === "Dark";
    const borderColor = isDark ? c.text : "#000";
    return { ...base, background: c.accent, color: "#fff", border: `${btn.border} ${borderColor}`, boxShadow: `${btn.shadow} ${borderColor}` };
  }
  if (btn.style === "elevated") return { ...base, background: c.accent, color: "#fff", border: "none", boxShadow: state === "hover" ? `0 6px 20px ${c.accent}66` : `0 4px 14px ${c.accent}44` };
  if (btn.style === "gradient") return { ...base, background: state === "hover" ? `linear-gradient(135deg, ${c.accentHover}, ${c.accent})` : `linear-gradient(135deg, ${c.accent}, ${c.accentHover})`, color: "#fff", border: "none", boxShadow: state === "hover" ? `0 4px 16px ${c.accent}44` : "none" };
  return base;
}

function getCardCSS(card, theme) {
  const c = theme.colors;
  if (card.id === "flat") return { background: c.bgCard, border: `1.5px solid ${c.border}`, borderRadius: "12px", boxShadow: "none" };
  if (card.id === "elevated") return { background: c.bgCard, border: "1px solid transparent", borderRadius: "14px", boxShadow: `0 4px 20px ${c.shadow}, 0 1px 3px ${c.shadow}` };
  if (card.id === "glass") return { background: `${c.bgCard}cc`, border: `1px solid ${c.border}88`, borderRadius: "14px", boxShadow: `0 8px 32px ${c.shadow}`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" };
  if (card.id === "bordered-accent") return { background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: "12px", boxShadow: "none", borderTop: `3px solid ${c.accent}` };
  if (card.id === "inset") return { background: c.bg, border: `1px solid ${c.border}`, borderRadius: "12px", boxShadow: `inset 0 2px 8px ${c.shadow}, inset 0 1px 3px ${c.shadow}` };
  return {};
}

function getInputCSS(input, theme, focused) {
  const c = theme.colors;
  const base = { fontFamily: `${theme.fonts.body}, sans-serif`, fontSize: "0.9rem", color: c.text, transition: "all 0.2s", outline: "none", width: "100%" };
  if (input.id === "underline") return { ...base, background: "transparent", border: "none", borderBottom: focused ? `2px solid ${c.accent}` : `1.5px solid ${c.border}`, borderRadius: 0, padding: "10px 2px" };
  if (input.id === "boxed") return { ...base, background: "transparent", border: focused ? `2px solid ${c.accent}` : `1.5px solid ${c.border}`, borderRadius: "8px", padding: "10px 14px" };
  if (input.id === "filled") return { ...base, background: c.inputBg, border: focused ? `2px solid ${c.accent}` : `2px solid transparent`, borderRadius: "10px", padding: "10px 14px" };
  if (input.id === "floating") return { ...base, background: "transparent", border: focused ? `2px solid ${c.accent}` : `1.5px solid ${c.border}`, borderRadius: "8px", padding: "16px 14px 6px" };
  if (input.id === "pill") return { ...base, background: c.inputBg, border: focused ? `2px solid ${c.accent}` : `2px solid ${c.border}`, borderRadius: "999px", padding: "10px 20px", boxShadow: focused ? `0 0 0 3px ${c.accentSoft}` : "none" };
  return base;
}

export default function DesignChooser() {
  const [themeId, setThemeId] = useState("midnight-gold");
  const [buttonId, setButtonId] = useState("solid");
  const [inputId, setInputId] = useState("boxed");
  const [cardId, setCardId] = useState("flat");
  const [tab, setTab] = useState("theme");
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [toggleOn, setToggleOn] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);
  const [checkVal, setCheckVal] = useState(true);
  const [radioVal, setRadioVal] = useState("a");
  const [exported, setExported] = useState(false);

  const theme = THEMES.find(t => t.id === themeId);
  const button = BUTTON_STYLES.find(b => b.id === buttonId);
  const input = INPUT_STYLES.find(i => i.id === inputId);
  const card = CARD_STYLES.find(c => c.id === cardId);

  const TABS = [
    { id: "theme", label: "Theme" },
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "cards", label: "Cards" },
  ];

  const [exportFormat, setExportFormat] = useState("json");
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    const fontNames = [...new Set(THEMES.flatMap(t => [t.fonts.heading, t.fonts.body]).map(f => f.replace(/'/g, "")))];
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontNames.map(f => f.replace(/ /g, "+") + ":wght@300;400;500;600;700").join("&family=")}&display=swap`;
    document.head.appendChild(link);
  }, []);

  const exportJSON = () => {
    const c = theme.colors;
    const tokens = {
      _meta: {
        generator: "Design System Builder",
        description: `Use these design tokens to implement the UI. Apply them to your framework of choice (Tailwind, CSS variables, SCSS, etc.)`,
      },
      theme: {
        name: theme.name,
        mode: theme.cat.toLowerCase(),
        colors: {
          background: { base: c.bg, surface: c.bgCard, hover: c.bgHover, input: c.inputBg },
          text: { primary: c.text, muted: c.textMuted },
          accent: { base: c.accent, hover: c.accentHover, soft: c.accentSoft },
          border: c.border,
          shadow: c.shadow,
        },
        typography: {
          heading: { fontFamily: theme.fonts.heading.replace(/'/g, ""), weights: [600, 700] },
          body: { fontFamily: theme.fonts.body.replace(/'/g, ""), weights: [400, 500, 600] },
        },
      },
      components: {
        button: {
          style: button.name,
          borderRadius: button.radius,
          variants: {
            primary: { background: "accent.base", color: "#fff", hoverBackground: "accent.hover" },
            secondary: { background: "transparent", color: "accent.base", border: "border" },
            link: { background: "transparent", color: "text.muted", textDecoration: "underline" },
          },
        },
        input: {
          style: input.name,
          ...(input.id === "underline" && { border: "bottom-only", background: "transparent", borderRadius: "0" }),
          ...(input.id === "boxed" && { border: "full", background: "transparent", borderRadius: "8px" }),
          ...(input.id === "filled" && { border: "focus-only", background: "input", borderRadius: "10px" }),
          ...(input.id === "floating" && { border: "full", background: "transparent", borderRadius: "8px", label: "floating" }),
        },
        card: {
          style: card.name,
          ...(card.id === "flat" && { border: true, shadow: false, borderRadius: "12px" }),
          ...(card.id === "elevated" && { border: false, shadow: true, borderRadius: "14px" }),
          ...(card.id === "glass" && { border: true, shadow: true, backdropBlur: "12px", borderRadius: "14px" }),
          ...(card.id === "bordered-accent" && { border: true, shadow: false, accentBorderTop: true, borderRadius: "12px" }),
        },
        toggle: { activeColor: "accent.base", inactiveColor: "border" },
        checkbox: { activeColor: "accent.base", borderRadius: button.radius === "0px" ? "0" : "4px" },
        slider: { trackColor: "border", fillColor: "accent.base", thumbBorder: "#fff" },
      },
    };
    return JSON.stringify(tokens, null, 2);
  };

  const exportCSS = () => {
    const c = theme.colors;
    return `:root {
  /* Theme: ${theme.name} (${theme.cat}) */
  --color-bg: ${c.bg};
  --color-surface: ${c.bgCard};
  --color-surface-hover: ${c.bgHover};
  --color-input-bg: ${c.inputBg};
  --color-text: ${c.text};
  --color-text-muted: ${c.textMuted};
  --color-accent: ${c.accent};
  --color-accent-hover: ${c.accentHover};
  --color-accent-soft: ${c.accentSoft};
  --color-border: ${c.border};
  --color-shadow: ${c.shadow};
  --font-heading: ${theme.fonts.heading}, sans-serif;
  --font-body: ${theme.fonts.body}, sans-serif;

  /* Button: ${button.name} */
  --btn-radius: ${button.radius};

  /* Input: ${input.name} | Card: ${card.name} */
}`;
  };

  const exportTailwind = () => {
    const c = theme.colors;
    return `// tailwind.config.js — extend your theme
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '${c.bg}', surface: '${c.bgCard}', hover: '${c.bgHover}', input: '${c.inputBg}' },
        text: { DEFAULT: '${c.text}', muted: '${c.textMuted}' },
        accent: { DEFAULT: '${c.accent}', hover: '${c.accentHover}', soft: '${c.accentSoft}' },
        border: '${c.border}',
      },
      fontFamily: {
        heading: [${theme.fonts.heading}, 'sans-serif'],
        body: [${theme.fonts.body}, 'sans-serif'],
      },
      borderRadius: {
        btn: '${button.radius}',
      },
    },
  },
};`;
  };

  const getExportContent = () => {
    if (exportFormat === "json") return exportJSON();
    if (exportFormat === "css") return exportCSS();
    if (exportFormat === "tailwind") return exportTailwind();
    return "";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent()).then(() => {
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    });
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${theme.colors.border}; border-radius: 3px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: theme.colors.bg,
        color: theme.colors.text,
        fontFamily: `${theme.fonts.body}, sans-serif`,
        transition: "background 0.45s, color 0.45s",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ padding: "28px 28px 0", textAlign: "center" }}>
          <h1 style={{
            fontFamily: `${theme.fonts.heading}, serif`,
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: theme.colors.accent,
            transition: "all 0.45s",
            marginBottom: 4,
          }}>Design System Builder</h1>
          <p style={{ color: theme.colors.textMuted, fontSize: "0.9rem", transition: "color 0.45s" }}>
            Every choice updates the preview live
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 4,
          padding: "20px 16px 0", flexWrap: "wrap",
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: tab === t.id ? `1.5px solid ${theme.colors.accent}` : `1.5px solid transparent`,
              background: tab === t.id ? theme.colors.accentSoft : "transparent",
              color: tab === t.id ? theme.colors.accent : theme.colors.textMuted,
              fontFamily: `${theme.fonts.body}, sans-serif`,
              fontSize: "0.84rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s",
            }}>{t.label}</button>
          ))}
        </div>

        {/* Main layout: options + live preview */}
        <div style={{
          display: "flex",
          flex: 1,
          gap: 20,
          padding: 24,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}>
          {/* Left: Options Panel */}
          <div style={{ flex: "1 1 340px", minWidth: 300, overflowY: "auto", paddingRight: 4, maxHeight: "75vh" }}>
            {/* THEME TAB */}
            {tab === "theme" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
                {THEMES.map(th => (
                  <div key={th.id} onClick={() => setThemeId(th.id)}
                    style={{
                      ...getCardCSS(card, theme),
                      padding: 14,
                      cursor: "pointer",
                      transition: "all 0.25s",
                      border: themeId === th.id ? `2px solid ${theme.colors.accent}` : getCardCSS(card, theme).border,
                      transform: themeId === th.id ? "scale(1.02)" : "none",
                    }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                      {[th.colors.bg, th.colors.accent, th.colors.text, th.colors.textMuted].map((c, i) => (
                        <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: c, border: `1.5px solid ${th.colors.border}` }} />
                      ))}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: 2 }}>{th.name}</div>
                    <div style={{ fontSize: "0.7rem", color: theme.colors.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{th.cat}</div>
                    <div style={{ fontSize: "0.72rem", color: theme.colors.textMuted, marginTop: 6 }}>
                      <span style={{ fontFamily: `${th.fonts.heading}, serif` }}>Aa</span>
                      {" · "}
                      <span style={{ fontFamily: `${th.fonts.body}, sans-serif` }}>Aa</span>
                      {" — "}
                      {th.fonts.heading.replace(/'/g, "")} + {th.fonts.body.replace(/'/g, "")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BUTTONS TAB */}
            {tab === "buttons" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
                {BUTTON_STYLES.map(bs => (
                  <div key={bs.id} onClick={() => setButtonId(bs.id)}
                    style={{
                      ...getCardCSS(card, theme),
                      padding: 18,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.25s",
                      border: buttonId === bs.id ? `2px solid ${theme.colors.accent}` : getCardCSS(card, theme).border,
                    }}>
                    <div style={{ marginBottom: 10 }}>
                      <span
                        onMouseEnter={() => setHoveredBtn(`opt-${bs.id}`)}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={getButtonCSS(bs, theme, hoveredBtn === `opt-${bs.id}` ? "hover" : "default")}
                      >Button</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: theme.colors.textMuted, fontWeight: 500 }}>{bs.name}</div>
                  </div>
                ))}
              </div>
            )}

            {/* INPUTS TAB */}
            {tab === "inputs" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {INPUT_STYLES.map(inp => (
                  <div key={inp.id} onClick={() => setInputId(inp.id)}
                    style={{
                      ...getCardCSS(card, theme),
                      padding: 18,
                      cursor: "pointer",
                      transition: "all 0.25s",
                      border: inputId === inp.id ? `2px solid ${theme.colors.accent}` : getCardCSS(card, theme).border,
                    }}>
                    <div style={{ fontSize: "0.78rem", color: theme.colors.textMuted, fontWeight: 500, marginBottom: 8 }}>{inp.name}</div>
                    <div style={{ position: "relative" }}>
                      <input
                        placeholder={inp.id === "floating" ? "" : "Type here..."}
                        onFocus={() => setFocusedInput(`opt-${inp.id}`)}
                        onBlur={() => setFocusedInput(null)}
                        style={getInputCSS(inp, theme, focusedInput === `opt-${inp.id}`)}
                        readOnly
                      />
                      {inp.id === "floating" && (
                        <span style={{
                          position: "absolute", left: 14,
                          top: focusedInput === `opt-${inp.id}` ? 4 : 12,
                          fontSize: focusedInput === `opt-${inp.id}` ? "0.68rem" : "0.85rem",
                          color: focusedInput === `opt-${inp.id}` ? theme.colors.accent : theme.colors.textMuted,
                          transition: "all 0.2s", pointerEvents: "none",
                        }}>Label</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CARDS TAB */}
            {tab === "cards" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                {CARD_STYLES.map(cs => (
                  <div key={cs.id} onClick={() => setCardId(cs.id)}
                    style={{
                      ...getCardCSS(cs, theme),
                      padding: 20,
                      cursor: "pointer",
                      transition: "all 0.25s",
                      outline: cardId === cs.id ? `2px solid ${theme.colors.accent}` : "none",
                      outlineOffset: 2,
                    }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>{cs.name}</div>
                    <div style={{ fontSize: "0.78rem", color: theme.colors.textMuted }}>{cs.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Live Preview */}
          <div style={{
            flex: "1 1 400px",
            minWidth: 320,
            ...getCardCSS(card, theme),
            padding: 28,
            transition: "all 0.4s",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxHeight: "75vh",
            overflowY: "auto",
          }}>
            <div>
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: theme.colors.accent, fontWeight: 600, marginBottom: 12 }}>
                Live Preview
              </div>
              <h2 style={{
                fontFamily: `${theme.fonts.heading}, serif`,
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: 6,
                transition: "all 0.45s",
              }}>Dashboard Overview</h2>
              <p style={{ color: theme.colors.textMuted, fontSize: "0.88rem", lineHeight: 1.6, transition: "color 0.45s" }}>
                Here's how your design system looks with the current selections applied to real UI components.
              </p>
            </div>

            {/* Buttons row */}
            <div>
              <div style={{ fontSize: "0.75rem", color: theme.colors.textMuted, marginBottom: 8, fontWeight: 500 }}>Buttons</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <span
                  onMouseEnter={() => setHoveredBtn("primary")}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={getButtonCSS(button, theme, hoveredBtn === "primary" ? "hover" : "default")}
                >Primary</span>
                <span style={{
                  ...getButtonCSS(button, theme),
                  background: "transparent",
                  color: theme.colors.accent,
                  border: `1.5px solid ${theme.colors.border}`,
                  boxShadow: "none",
                }}>Secondary</span>
                <span style={{
                  ...getButtonCSS(button, theme),
                  background: "transparent",
                  color: theme.colors.textMuted,
                  border: "none",
                  boxShadow: "none",
                  padding: "10px 16px",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}>Link</span>
              </div>
            </div>

            {/* Input */}
            <div>
              <div style={{ fontSize: "0.75rem", color: theme.colors.textMuted, marginBottom: 8, fontWeight: 500 }}>Form Input</div>
              <div style={{ position: "relative", maxWidth: 340 }}>
                <input
                  placeholder={input.id === "floating" ? "" : "Search contracts..."}
                  onFocus={() => setFocusedInput("preview")}
                  onBlur={() => setFocusedInput(null)}
                  style={getInputCSS(input, theme, focusedInput === "preview")}
                />
                {input.id === "floating" && (
                  <span style={{
                    position: "absolute", left: 14,
                    top: focusedInput === "preview" ? 4 : 14,
                    fontSize: focusedInput === "preview" ? "0.68rem" : "0.88rem",
                    color: focusedInput === "preview" ? theme.colors.accent : theme.colors.textMuted,
                    transition: "all 0.2s", pointerEvents: "none",
                  }}>Search contracts...</span>
                )}
              </div>
            </div>

            {/* Toggle, Slider, Checkbox, Radio */}
            <div>
              <div style={{ fontSize: "0.75rem", color: theme.colors.textMuted, marginBottom: 10, fontWeight: 500 }}>Controls</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div onClick={() => setToggleOn(!toggleOn)} style={{
                    width: 44, height: 24, borderRadius: "999px", cursor: "pointer",
                    background: toggleOn ? theme.colors.accent : theme.colors.border,
                    transition: "background 0.2s", position: "relative",
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", background: "#fff",
                      position: "absolute", top: 3,
                      left: toggleOn ? 22 : 4,
                      transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }} />
                  </div>
                  <span style={{ fontSize: "0.85rem" }}>Auto-refresh data</span>
                </div>

                {/* Slider */}
                <div style={{ maxWidth: 260 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.82rem" }}>Confidence threshold</span>
                    <span style={{ fontSize: "0.82rem", color: theme.colors.accent, fontWeight: 600 }}>{sliderVal}%</span>
                  </div>
                  <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
                    <div style={{ position: "absolute", width: "100%", height: 4, background: theme.colors.border, borderRadius: 2 }} />
                    <div style={{ position: "absolute", width: `${sliderVal}%`, height: 4, background: theme.colors.accent, borderRadius: 2, transition: "width 0.1s" }} />
                    <input type="range" min={0} max={100} value={sliderVal} onChange={e => setSliderVal(+e.target.value)}
                      style={{ position: "absolute", width: "100%", height: 20, opacity: 0, cursor: "pointer" }} />
                    <div style={{
                      position: "absolute", left: `calc(${sliderVal}% - 8px)`,
                      width: 16, height: 16, borderRadius: "50%",
                      background: theme.colors.accent, border: "2px solid #fff",
                      boxShadow: `0 1px 4px ${theme.colors.shadow}`,
                      transition: "left 0.1s", pointerEvents: "none",
                    }} />
                  </div>
                </div>

                {/* Checkbox + Radio */}
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div onClick={() => setCheckVal(!checkVal)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: button.radius === "0px" ? 0 : 4,
                      border: checkVal ? "none" : `2px solid ${theme.colors.border}`,
                      background: checkVal ? theme.colors.accent : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s", fontSize: "0.7rem", color: "#fff", fontWeight: 700,
                    }}>{checkVal ? "✓" : ""}</div>
                    <span style={{ fontSize: "0.85rem" }}>Enable alerts</span>
                  </div>
                  {["a", "b"].map(v => (
                    <div key={v} onClick={() => setRadioVal(v)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        border: `2px solid ${radioVal === v ? theme.colors.accent : theme.colors.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}>
                        {radioVal === v && <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.colors.accent }} />}
                      </div>
                      <span style={{ fontSize: "0.85rem" }}>{v === "a" ? "Monthly" : "Annual"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini card preview */}
            <div>
              <div style={{ fontSize: "0.75rem", color: theme.colors.textMuted, marginBottom: 8, fontWeight: 500 }}>Card</div>
              <div style={{
                ...getCardCSS(card, theme),
                padding: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Iron Ore CFR China</div>
                  <div style={{ fontSize: "0.78rem", color: theme.colors.textMuted }}>62% Fe Fines · Platts IODEX</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: theme.colors.accent }}>$108.25</div>
                  <div style={{ fontSize: "0.72rem", color: "#4ade80" }}>+2.15%</div>
                </div>
              </div>
            </div>

            {/* Typography preview */}
            <div>
              <div style={{ fontSize: "0.75rem", color: theme.colors.textMuted, marginBottom: 8, fontWeight: 500 }}>Typography</div>
              <div style={{ fontFamily: `${theme.fonts.heading}, serif`, fontSize: "1.3rem", fontWeight: 700, marginBottom: 4, transition: "all 0.45s" }}>
                Heading — {theme.fonts.heading.replace(/'/g, "")}
              </div>
              <div style={{ fontFamily: `${theme.fonts.body}, sans-serif`, fontSize: "0.9rem", color: theme.colors.textMuted, lineHeight: 1.6, transition: "all 0.45s" }}>
                Body text · {theme.fonts.body.replace(/'/g, "")} · The quick brown fox jumps over the lazy dog. 0123456789
              </div>
            </div>
          </div>
        </div>

        {/* Export Bar */}
        <div style={{
          maxWidth: 1200, margin: "0 auto 28px", width: "100%", padding: "0 24px",
        }}>
          <div style={{
            ...getCardCSS(card, theme),
            padding: "16px 24px",
            transition: "all 0.4s",
          }}>
            {/* Summary + toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: "0.84rem", color: theme.colors.textMuted }}>
                <strong style={{ color: theme.colors.text }}>{theme.name}</strong> · {button.name} buttons · {input.name} inputs · {card.name} cards
              </div>
              <span onClick={() => setShowExport(!showExport)}
                onMouseEnter={() => setHoveredBtn("export")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={getButtonCSS(button, theme, hoveredBtn === "export" ? "hover" : "default")}
              >
                {showExport ? "Hide Export ▲" : "Export Design Tokens ▼"}
              </span>
            </div>

            {/* Expandable export panel */}
            {showExport && (
              <div style={{ marginTop: 18 }}>
                {/* Format selector */}
                <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                  {[
                    { id: "json", label: "JSON Tokens", desc: "Best for AI agents" },
                    { id: "css", label: "CSS Variables", desc: "Drop into any project" },
                    { id: "tailwind", label: "Tailwind Config", desc: "Extend tailwind.config.js" },
                  ].map(fmt => (
                    <button key={fmt.id} onClick={() => setExportFormat(fmt.id)} style={{
                      padding: "8px 16px",
                      borderRadius: button.radius,
                      border: exportFormat === fmt.id ? `2px solid ${theme.colors.accent}` : `1.5px solid ${theme.colors.border}`,
                      background: exportFormat === fmt.id ? theme.colors.accentSoft : "transparent",
                      color: exportFormat === fmt.id ? theme.colors.accent : theme.colors.textMuted,
                      fontFamily: `${theme.fonts.body}, sans-serif`,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 2,
                    }}>
                      <span>{fmt.label}</span>
                      <span style={{ fontSize: "0.68rem", fontWeight: 400, opacity: 0.7 }}>{fmt.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Code display */}
                <div style={{ position: "relative" }}>
                  <textarea
                    readOnly
                    value={getExportContent()}
                    style={{
                      width: "100%",
                      height: exportFormat === "json" ? 320 : 220,
                      background: theme.colors.bg,
                      color: theme.colors.textMuted,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: "10px",
                      padding: 16,
                      fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
                      fontSize: "0.76rem",
                      lineHeight: 1.7,
                      resize: "vertical",
                      outline: "none",
                      transition: "all 0.3s",
                    }}
                  />
                  <span onClick={handleCopy}
                    onMouseEnter={() => setHoveredBtn("copy")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{
                      ...getButtonCSS(button, theme, hoveredBtn === "copy" ? "hover" : "default"),
                      position: "absolute",
                      top: 12,
                      right: 12,
                      padding: "6px 14px",
                      fontSize: "0.78rem",
                    }}
                  >
                    {exported ? "✓ Copied!" : "Copy"}
                  </span>
                </div>

                {/* AI agent tip */}
                <div style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  background: theme.colors.accentSoft,
                  borderRadius: "8px",
                  fontSize: "0.78rem",
                  color: theme.colors.accent,
                  lineHeight: 1.5,
                }}>
                  💡 <strong>Tip for AI agents:</strong> Use <strong>JSON Tokens</strong> format — paste it into your Claude Code or Codex prompt with an instruction like: <em>"Apply these design tokens to my project. Generate the appropriate theme config, component styles, and utility classes."</em>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
