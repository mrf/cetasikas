import { useState, useRef, useEffect } from "react";

const CATEGORIES = {
  universal: {
    label: "Universal",
    sublabel: "Sabbacittasādhāraṇa",
    description: "Arise with every moment of consciousness — the bedrock of all experience",
    color: "#C9A84C",
    ring: 0,
    items: [
      { pali: "Phassa", english: "Contact", desc: "The meeting of sense base, object, and consciousness. The spark that ignites every moment of knowing." },
      { pali: "Vedanā", english: "Feeling", desc: "Pleasant, unpleasant, or neutral tone. Not emotion — the raw valence before the story begins." },
      { pali: "Saññā", english: "Perception", desc: "Recognition, labeling. The mind's pattern-matching that says 'this is that.'" },
      { pali: "Cetanā", english: "Volition", desc: "Intention, the directing force. The Buddha said 'cetanā is kamma' — this is the seed-planter itself." },
      { pali: "Ekaggatā", english: "One-pointedness", desc: "Unification of mind on object. Present in every moment, but refined in samādhi it becomes jhāna factor." },
      { pali: "Jīvitindriya", english: "Psychic Life", desc: "The vitality of mental factors — what keeps the mental process alive and functioning." },
      { pali: "Manasikāra", english: "Attention", desc: "Turning of mind toward object. Yoniso (wise) or ayoniso (unwise) — the rudder of the whole ship." },
    ]
  },
  occasional: {
    label: "Occasional",
    sublabel: "Pakiṇṇaka",
    description: "Variable factors — ethically neutral, arising when conditions call them forth",
    color: "#8B9DAF",
    ring: 1,
    items: [
      { pali: "Vitakka", english: "Applied Thought", desc: "Initial application of mind to object. First jhāna factor — the mind reaching toward." },
      { pali: "Vicāra", english: "Sustained Thought", desc: "Continued examination. The mind rubbing against the object, staying with it." },
      { pali: "Adhimokkha", english: "Determination", desc: "Decision, conviction. The mind committing to its object without wavering." },
      { pali: "Vīriya", english: "Energy", desc: "Effort, exertion. Ethically neutral — fuels both wholesome and unwholesome action equally." },
      { pali: "Pīti", english: "Rapture", desc: "Joy, delight, zest. A jhāna factor. Can range from goosebumps to full-body ecstasy." },
      { pali: "Chanda", english: "Desire-to-act", desc: "Not craving — functional intention toward action. The wish to do, ethically neutral." },
    ]
  },
  unwholesome_universal: {
    label: "Universally Unwholesome",
    sublabel: "Akusala-sādhāraṇa",
    description: "Present in every unwholesome consciousness — the four that always travel together",
    color: "#A0522D",
    ring: 2,
    items: [
      { pali: "Moha", english: "Delusion", desc: "The root ignorance. Not seeing things as they are. Present in ALL unwholesome states — the mother of suffering." },
      { pali: "Ahirika", english: "Shamelessness", desc: "Lack of moral conscience. No inner restraint — the internal brake is off." },
      { pali: "Anottappa", english: "Recklessness", desc: "No moral dread of consequences. The external brake is off — no fear of results." },
      { pali: "Uddhacca", english: "Restlessness", desc: "Agitation, scattered mind. The opposite of samādhi. The monkey swinging from branch to branch." },
    ]
  },
  greed_group: {
    label: "Greed Group",
    sublabel: "Lobha-mūla",
    description: "Rooted in attraction — the mind reaching out, grasping, pulling toward",
    color: "#CD5C5C",
    ring: 2,
    items: [
      { pali: "Lobha", english: "Greed", desc: "Attachment, clinging, desire. One of the three root poisons. The sticky hand that won't let go." },
      { pali: "Diṭṭhi", english: "Wrong View", desc: "Fixed views, ideology, dogma. The mind crystallized around an incorrect understanding." },
      { pali: "Māna", english: "Conceit", desc: "The I-am comparison: I'm better, I'm worse, I'm equal. Subtle even in advanced practitioners." },
    ]
  },
  aversion_group: {
    label: "Aversion Group",
    sublabel: "Dosa-mūla",
    description: "Rooted in pushing away — the mind contracting, striking, rejecting",
    color: "#B22222",
    ring: 2,
    items: [
      { pali: "Dosa", english: "Aversion", desc: "Hatred, anger, ill-will. The second root poison. The fist that strikes." },
      { pali: "Issā", english: "Envy", desc: "Resentment at others' success. The mind that can't bear another's good fortune." },
      { pali: "Macchariya", english: "Avarice", desc: "Stinginess, miserliness. Hoarding — the closed fist that won't give." },
      { pali: "Kukkucca", english: "Remorse", desc: "Worry about past actions. Not wholesome regret — obsessive, circular, unproductive gnawing." },
    ]
  },
  unwholesome_other: {
    label: "Other Unwholesome",
    sublabel: "Akusala",
    description: "Additional factors of mental darkness",
    color: "#8B4513",
    ring: 2,
    items: [
      { pali: "Thīna", english: "Sloth", desc: "Mental stiffness, unwieldiness. The mind going thick and dull like cold honey." },
      { pali: "Middha", english: "Torpor", desc: "Drowsiness of mental factors. The co-factor of sloth — together they form the third hindrance." },
      { pali: "Vicikicchā", english: "Doubt", desc: "Paralyzing indecision about path, practice, teacher. Not healthy questioning — stuck-ness." },
    ]
  },
  beautiful_universal: {
    label: "Universal Beautiful",
    sublabel: "Sobhana-sādhāraṇa",
    description: "Present in every wholesome consciousness — the 19 that bloom together",
    color: "#2E8B57",
    ring: 3,
    items: [
      { pali: "Saddhā", english: "Faith", desc: "Confidence, trust. Not blind belief — clarity that allows the mind to settle and commit to practice." },
      { pali: "Sati", english: "Mindfulness", desc: "Non-forgetfulness, present-moment awareness. The gatekeeper. Thich Nhat Hanh's 'bell of mindfulness.'" },
      { pali: "Hiri", english: "Moral Shame", desc: "Inner conscience. The guardians of the world (with ottappa). Shame born of self-respect." },
      { pali: "Ottappa", english: "Moral Dread", desc: "Fear of consequences. The external guardian. Together with hiri, the bright mirrors of ahirika/anottappa." },
      { pali: "Alobha", english: "Non-greed", desc: "Generosity, letting go. The direct antidote to lobha — the open hand." },
      { pali: "Adosa", english: "Non-hatred", desc: "Loving-kindness, gentleness. The direct antidote to dosa — the soft heart." },
      { pali: "Tatramajjhattatā", english: "Equanimity", desc: "Balance of mind. Neither pulled nor pushed. The mind standing in the middle, steady." },
      { pali: "Kāya-passaddhi", english: "Tranquility of Factors", desc: "Calm of the mental body. The settling of agitation in the mental factors." },
      { pali: "Citta-passaddhi", english: "Tranquility of Mind", desc: "Calm of consciousness itself. The water becoming still." },
      { pali: "Kāya-lahutā", english: "Lightness of Factors", desc: "The mental factors become buoyant, unburdened. Opposite of sloth." },
      { pali: "Citta-lahutā", english: "Lightness of Mind", desc: "Consciousness itself becomes light and agile." },
      { pali: "Kāya-mudutā", english: "Malleability of Factors", desc: "Mental factors become soft, workable. Like well-kneaded clay." },
      { pali: "Citta-mudutā", english: "Malleability of Mind", desc: "Consciousness becomes pliable, not rigid or brittle." },
      { pali: "Kāya-kammaññatā", english: "Wieldiness of Factors", desc: "Mental factors become fit for work, responsive to direction." },
      { pali: "Citta-kammaññatā", english: "Wieldiness of Mind", desc: "Consciousness becomes a well-tuned instrument, ready." },
      { pali: "Kāya-pāguññatā", english: "Proficiency of Factors", desc: "Skill and health of mental factors. Functioning at full capacity." },
      { pali: "Citta-pāguññatā", english: "Proficiency of Mind", desc: "Consciousness operating with mastery and ease." },
      { pali: "Kāya-ujukatā", english: "Rectitude of Factors", desc: "Straightness, honesty of mental factors. No crookedness." },
      { pali: "Citta-ujukatā", english: "Rectitude of Mind", desc: "Consciousness itself upright, without deception or distortion." },
    ]
  },
  abstinences: {
    label: "Abstinences",
    sublabel: "Virati",
    description: "Active restraint — the mind turning away from harm at the decisive moment",
    color: "#3CB371",
    ring: 3,
    items: [
      { pali: "Sammā-vācā", english: "Right Speech", desc: "Abstaining from lying, divisive speech, harsh speech, idle chatter. The tongue restrained." },
      { pali: "Sammā-kammanta", english: "Right Action", desc: "Abstaining from killing, stealing, sexual misconduct. The body restrained." },
      { pali: "Sammā-ājīva", english: "Right Livelihood", desc: "Abstaining from harmful occupation. How you earn your rice matters." },
    ]
  },
  illimitables: {
    label: "Illimitables",
    sublabel: "Appamaññā",
    description: "Boundless qualities — radiating without limit in all directions",
    color: "#20B2AA",
    ring: 3,
    items: [
      { pali: "Karuṇā", english: "Compassion", desc: "The trembling of the heart in response to suffering. Not pity — the wish to remove pain." },
      { pali: "Muditā", english: "Appreciative Joy", desc: "Delight in others' happiness and success. The antidote to envy. The most neglected brahmavihāra." },
    ]
  },
  wisdom: {
    label: "Wisdom",
    sublabel: "Paññā",
    description: "The third root — seeing things as they truly are",
    color: "#FFD700",
    ring: 3,
    items: [
      { pali: "Paññā", english: "Wisdom", desc: "Non-delusion, understanding. Penetrating the three characteristics: anicca, dukkha, anattā. The sword that cuts through." },
    ]
  }
};

const RING_COLORS = {
  0: { bg: "rgba(201,168,76,0.06)", border: "rgba(201,168,76,0.2)" },
  1: { bg: "rgba(139,157,175,0.06)", border: "rgba(139,157,175,0.2)" },
  2: { bg: "rgba(178,34,34,0.06)", border: "rgba(178,34,34,0.15)" },
  3: { bg: "rgba(46,139,87,0.06)", border: "rgba(46,139,87,0.15)" },
};

const RING_LABELS = {
  0: "Universal — Every Moment",
  1: "Occasional — Variable",
  2: "Unwholesome — Akusala",
  3: "Beautiful — Sobhana",
};

const CONNECTIONS = [
  { from: "Moha", to: "Paññā", type: "antidote", label: "Direct antidote" },
  { from: "Lobha", to: "Alobha", type: "antidote", label: "Direct antidote" },
  { from: "Dosa", to: "Adosa", type: "antidote", label: "Direct antidote" },
  { from: "Ahirika", to: "Hiri", type: "antidote", label: "Bright mirror" },
  { from: "Anottappa", to: "Ottappa", type: "antidote", label: "Bright mirror" },
  { from: "Issā", to: "Muditā", type: "antidote", label: "Direct antidote" },
  { from: "Uddhacca", to: "Tatramajjhattatā", type: "antidote", label: "Restlessness → Equanimity" },
  { from: "Thīna", to: "Kāya-lahutā", type: "antidote", label: "Sloth → Lightness" },
  { from: "Vicikicchā", to: "Saddhā", type: "antidote", label: "Doubt → Faith" },
  { from: "Vedanā", to: "Lobha", type: "condition", label: "Pleasant vedanā conditions greed" },
  { from: "Vedanā", to: "Dosa", type: "condition", label: "Unpleasant vedanā conditions aversion" },
  { from: "Manasikāra", to: "Sati", type: "condition", label: "Wise attention supports mindfulness" },
  { from: "Cetanā", to: "Sammā-kammanta", type: "condition", label: "Volition directed by right action" },
];

function getAllItems() {
  const items = [];
  Object.entries(CATEGORIES).forEach(([catKey, cat]) => {
    cat.items.forEach((item, idx) => {
      items.push({ ...item, category: catKey, color: cat.color, ring: cat.ring, catLabel: cat.label });
    });
  });
  return items;
}

function computePositions(width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.min(cx, cy) - 70;
  const ringRadii = [maxR * 0.31, maxR * 0.58, maxR * 0.8, maxR * 1.06];
  const positions = {};

  Object.entries(CATEGORIES).forEach(([catKey, cat]) => {
    const ringItems = Object.values(CATEGORIES).filter(c => c.ring === cat.ring);
    const ringStart = ringItems.slice(0, ringItems.indexOf(cat)).reduce((sum, c) => sum + c.items.length, 0);
    const ringTotal = ringItems.reduce((sum, c) => sum + c.items.length, 0);
    const r = ringRadii[cat.ring];

    cat.items.forEach((item, idx) => {
      const globalIdx = ringStart + idx;
      const angle = (globalIdx / ringTotal) * Math.PI * 2 - Math.PI / 2;
      positions[item.pali] = {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        angle
      };
    });
  });
  return { positions, ringRadii, cx, cy };
}

function estimateTextWidth(text, fontSize) {
  return [...text].reduce((width, char) => {
    if (char === " ") return width + fontSize * 0.28;
    if ("āīūṅñṭḍṇḷṃĀĪŪṄÑṬḌṆḶṂ".includes(char)) return width + fontSize * 0.62;
    if (char === "-" || char === "–") return width + fontSize * 0.32;
    return width + fontSize * 0.52;
  }, 0);
}

function getNodeSize(item, isSelected) {
  const paliFont = isSelected ? 13 : 11;
  const englishFont = isSelected ? 10 : 8.5;
  const horizontalPadding = isSelected ? 38 : 30;
  const minWidth = isSelected ? 112 : item.ring === 0 ? 96 : 86;
  const width = Math.ceil(Math.max(
    minWidth,
    estimateTextWidth(item.pali, paliFont) + horizontalPadding,
    estimateTextWidth(item.english, englishFont) + horizontalPadding
  ));

  return {
    width,
    height: isSelected ? 58 : item.ring === 0 ? 50 : 44,
    paliFont,
    englishFont,
  };
}

export default function CetasikasMandala() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showConnections, setShowConnections] = useState(true);
  const [filterRing, setFilterRing] = useState(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 1240, h: 1240 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      const size = Math.min(width, 1240);
      setDims({ w: size, h: size });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const allItems = getAllItems();
  const { positions, ringRadii, cx, cy } = computePositions(dims.w, dims.h);

  const selectedItem = selected ? allItems.find(i => i.pali === selected) : null;
  const selectedCat = selectedItem ? CATEGORIES[selectedItem.category] : null;

  const activeConnections = selected
    ? CONNECTIONS.filter(c => c.from === selected || c.to === selected)
    : [];
  const visibleConnections = selected ? activeConnections : CONNECTIONS;

  const dimmed = (item) => {
    if (filterRing !== null && item.ring !== filterRing) return true;
    if (activeCategory && item.category !== activeCategory) return true;
    return false;
  };

  const controlLabelStyle = {
    color: "#5a6070",
    fontSize: 10,
    letterSpacing: 0,
    marginBottom: 6,
    textAlign: "center",
    textTransform: "uppercase",
  };

  const controlRowStyle = {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const baseFilterButtonStyle = {
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    padding: "4px 14px",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0C0E13",
      color: "#E8E0D0",
      fontFamily: "'Crimson Pro', 'Garamond', 'Georgia', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 16px",
    }}>
      <h1 style={{
        fontSize: "clamp(22px, 4vw, 36px)",
        fontWeight: 300,
        letterSpacing: 0,
        textTransform: "uppercase",
        color: "#C9A84C",
        marginBottom: 4,
        textAlign: "center",
      }}>
        The 52 Cetasikas
      </h1>
      <p style={{
        fontSize: "clamp(13px, 2vw, 16px)",
        color: "#8B9DAF",
        fontStyle: "italic",
        marginTop: 0,
        marginBottom: 8,
        textAlign: "center",
      }}>
        Seeds of Consciousness — Abhidhamma &amp; Yogācāra
      </p>
      <p style={{
        fontSize: "clamp(11px, 1.5vw, 13px)",
        color: "#5a6070",
        marginTop: 0,
        marginBottom: 20,
        textAlign: "center",
        maxWidth: 500,
      }}>
        Click any seed to explore. Lines show antidote pairs and conditioning relationships.
      </p>

      {/* Filters */}
      <div style={{
        width: "100%",
        maxWidth: 1040,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginBottom: 16,
      }}>
        <div>
          <div style={controlLabelStyle}>Rings</div>
          <div style={controlRowStyle}>
            <button
              aria-pressed={filterRing === null}
              onClick={() => setFilterRing(null)}
              style={{
                ...baseFilterButtonStyle,
                background: filterRing === null ? "rgba(232,224,208,0.15)" : "transparent",
                border: "1px solid rgba(232,224,208,0.2)",
                color: "#E8E0D0",
              }}
            >All Rings</button>
            {[0,1,2,3].map(r => (
              <button
                key={r}
                aria-pressed={filterRing === r}
                onClick={() => setFilterRing(filterRing === r ? null : r)}
                style={{
                  ...baseFilterButtonStyle,
                  background: filterRing === r ? "rgba(232,224,208,0.15)" : "transparent",
                  border: `1px solid ${RING_COLORS[r].border}`,
                  color: r === 2 ? "#CD5C5C" : r === 3 ? "#3CB371" : r === 0 ? "#C9A84C" : "#8B9DAF",
                }}
              >{RING_LABELS[r]}</button>
            ))}
          </div>
        </div>

        <div>
          <div style={controlLabelStyle}>Categories</div>
          <div style={controlRowStyle}>
            <button
              aria-pressed={activeCategory === null}
              onClick={() => setActiveCategory(null)}
              style={{
                ...baseFilterButtonStyle,
                background: activeCategory === null ? "rgba(232,224,208,0.15)" : "transparent",
                border: "1px solid rgba(232,224,208,0.2)",
                color: "#E8E0D0",
              }}
            >All Categories</button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                aria-pressed={activeCategory === key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                style={{
                  ...baseFilterButtonStyle,
                  background: activeCategory === key ? `${cat.color}22` : "transparent",
                  border: `1px solid ${activeCategory === key ? `${cat.color}99` : `${cat.color}44`}`,
                  color: cat.color,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  opacity: activeCategory && activeCategory !== key ? 0.55 : 1,
                }}
              >
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: cat.color,
                  display: "inline-block",
                }} />
                <span>{cat.label} ({cat.items.length})</span>
              </button>
            ))}
          </div>
        </div>

        <div style={controlRowStyle}>
          <button
            aria-pressed={showConnections}
            onClick={() => setShowConnections(!showConnections)}
            style={{
              ...baseFilterButtonStyle,
              background: showConnections ? "rgba(232,224,208,0.12)" : "transparent",
              border: "1px solid rgba(232,224,208,0.15)",
              color: "#8B9DAF",
            }}
          >{showConnections ? "⟷ Hide Lines" : "⟷ Show Lines"}</button>
        </div>
      </div>

      {/* SVG Mandala */}
      <div ref={containerRef} style={{ width: "100%", maxWidth: 1240, aspectRatio: "1" }}>
        <svg
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          {/* Connection lines */}
          {showConnections && visibleConnections.map((conn, i) => {
            const from = positions[conn.from];
            const to = positions[conn.to];
            if (!from || !to) return null;
            const isAntidote = conn.type === "antidote";
            const isActive = selected && (conn.from === selected || conn.to === selected);
            return (
              <line
                key={i}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={isAntidote ? "#FFD70044" : "#8B9DAF33"}
                strokeWidth={isActive ? 2.5 : 1}
                strokeDasharray={isAntidote ? "none" : "3 4"}
                opacity={isActive ? 0.9 : 0.3}
              />
            );
          })}

          {/* Ring backgrounds */}
          {ringRadii.map((r, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={RING_COLORS[i].border}
              strokeWidth={1}
              strokeDasharray={i > 0 ? "4 6" : "none"}
              opacity={filterRing !== null && filterRing !== i ? 0.15 : 0.6}
            />
          ))}

          {/* Center label */}
          <text x={cx} y={cy - 10} textAnchor="middle" fill="#C9A84C" fontSize={14} fontFamily="'Crimson Pro', serif" fontWeight={600} opacity={0.5}>
            CITTA
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#8B9DAF" fontSize={11} fontFamily="'Crimson Pro', serif" fontStyle="italic" opacity={0.4}>
            consciousness
          </text>

          {/* Active connection labels */}
          {showConnections && selected && activeConnections.map((conn, i) => {
            const from = positions[conn.from];
            const to = positions[conn.to];
            if (!from || !to) return null;
            return (
              <text
                key={i}
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 6}
                textAnchor="middle"
                fill="#E8E0D0"
                fontSize={11}
                fontFamily="'Crimson Pro', serif"
                opacity={0.7}
              >
                {conn.label}
              </text>
            );
          })}

          {/* Nodes */}
          {allItems.map((item) => {
            const pos = positions[item.pali];
            if (!pos) return null;
            const isSelected = selected === item.pali;
            const isDimmed = dimmed(item);
            const isConnected = selected && activeConnections.some(c => c.from === item.pali || c.to === item.pali);
            const node = getNodeSize(item, isSelected);
            const glowR = Math.max(node.width, node.height) / 2 + 10;

            return (
              <g
                key={item.pali}
                onClick={() => setSelected(isSelected ? null : item.pali)}
                style={{ cursor: "pointer" }}
                opacity={isDimmed && !isConnected ? 0.15 : 1}
              >
                {/* Glow for selected */}
                {isSelected && (
                  <ellipse cx={pos.x} cy={pos.y} rx={node.width / 2 + 10} ry={node.height / 2 + 10} fill={item.color} opacity={0.12} />
                )}
                {isConnected && !isSelected && (
                  <ellipse cx={pos.x} cy={pos.y} rx={glowR} ry={node.height / 2 + 7} fill="#FFD700" opacity={0.08} />
                )}
                <rect
                  x={pos.x - node.width / 2}
                  y={pos.y - node.height / 2}
                  width={node.width}
                  height={node.height}
                  rx={node.height / 2}
                  ry={node.height / 2}
                  fill={isSelected ? item.color : `${item.color}22`}
                  stroke={item.color}
                  strokeWidth={isSelected ? 3 : isConnected ? 2.5 : 1.5}
                  opacity={isSelected ? 1 : 0.85}
                />
                {/* Pali label */}
                <text
                  x={pos.x}
                  y={pos.y - (isSelected ? 6 : 4)}
                  textAnchor="middle"
                  fill={isSelected ? "#0C0E13" : "#E8E0D0"}
                  fontSize={node.paliFont}
                  fontFamily="'Crimson Pro', serif"
                  fontWeight={isSelected ? 700 : 400}
                >
                  {item.pali}
                </text>
                {/* English label */}
                <text
                  x={pos.x}
                  y={pos.y + (isSelected ? 12 : 10)}
                  textAnchor="middle"
                  fill={isSelected ? "#0C0E13" : item.color}
                  fontSize={node.englishFont}
                  fontFamily="'Crimson Pro', serif"
                  fontStyle="italic"
                  opacity={isSelected ? 1 : 0.8}
                >
                  {item.english}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {selectedItem && selectedCat && (
        <div style={{
          maxWidth: 600,
          width: "100%",
          background: "rgba(232,224,208,0.04)",
          border: `1px solid ${selectedItem.color}33`,
          borderRadius: 12,
          padding: "20px 24px",
          marginTop: 8,
          animation: "fadeIn 0.3s ease",
        }}>
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <div>
              <span style={{ color: selectedItem.color, fontSize: 22, fontWeight: 600 }}>
                {selectedItem.pali}
              </span>
              <span style={{ color: "#8B9DAF", fontSize: 16, marginLeft: 10, fontStyle: "italic" }}>
                {selectedItem.english}
              </span>
            </div>
            <span style={{
              fontSize: 10,
              color: selectedItem.color,
              border: `1px solid ${selectedItem.color}44`,
              borderRadius: 12,
              padding: "2px 10px",
            }}>
              {selectedCat.label}
            </span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "#C8C0B0", margin: 0 }}>
            {selectedItem.desc}
          </p>
          {activeConnections.length > 0 && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(232,224,208,0.08)" }}>
              <span style={{ fontSize: 11, color: "#8B9DAF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Relationships
              </span>
              {activeConnections.map((conn, i) => {
                const other = conn.from === selected ? conn.to : conn.from;
                const otherItem = allItems.find(it => it.pali === other);
                return (
                  <div key={i} style={{
                    marginTop: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                  }}>
                    <span style={{
                      fontSize: 9,
                      color: conn.type === "antidote" ? "#FFD700" : "#8B9DAF",
                      border: `1px solid ${conn.type === "antidote" ? "#FFD70044" : "#8B9DAF33"}`,
                      borderRadius: 8,
                      padding: "1px 7px",
                    }}>
                      {conn.type === "antidote" ? "antidote" : "conditions"}
                    </span>
                    <span
                      style={{ color: otherItem?.color || "#E8E0D0", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}
                      onClick={(e) => { e.stopPropagation(); setSelected(other); }}
                    >
                      {other}
                    </span>
                    <span style={{ color: "#5a6070", fontStyle: "italic", fontSize: 11 }}>
                      — {conn.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Seeds metaphor note */}
      <div style={{
        maxWidth: 580,
        textAlign: "center",
        marginTop: 24,
        padding: "16px 20px",
        background: "rgba(46,139,87,0.04)",
        border: "1px solid rgba(46,139,87,0.12)",
        borderRadius: 10,
      }}>
        <p style={{ fontSize: 13, color: "#8B9DAF", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
          In the Plum Village tradition, these are seeds (bīja) in store consciousness.
          Unwholesome seeds are not enemies to destroy — they are seeds to stop watering.
          Beautiful seeds are to be watered daily through practice, sangha, and mindful living.
          The gold lines show antidote pairs: every unwholesome seed has a beautiful seed that transforms it.
        </p>
      </div>
    </div>
  );
}
