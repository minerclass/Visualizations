import React, { useEffect, useState } from "react";

const COLORS = {
  bg: "#0f1117",
  surface: "#181b24",
  surfaceHover: "#1e2230",
  border: "#2a2e3b",
  borderAccent: "#3d4258",
  text: "#e8e9ed",
  textMuted: "#8b8fa3",
  textDim: "#5c6078",
  noetic: "#e07a5f",
  rhetorical: "#81b29a",
  existential: "#f2cc8f",
  infrastructural: "#7289da",
  accent: "#c9a87c",
  accentDim: "#8a7455",
  qual: "#81b29a",
  quan: "#7289da",
  ai: "#e07a5f",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Source Sans 3', 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

const dimensions = [
  { key: "noetic", label: "Noetic", color: COLORS.noetic, desc: "Cognitive struggle and productive difficulty", icon: "🧠", detail: "Measures the frequency and intentionality of cognitive struggle-preserving practices: requiring drafting before AI use, mandating retrieval practice, designing productive failure tasks." },
  { key: "rhetorical", label: "Rhetorical", color: COLORS.rhetorical, desc: "Engagement with real audiences", icon: "🗣️", detail: "Captures practices that require engagement with real audiences: peer review, public presentation, authentic audience writing assignments." },
  { key: "existential", label: "Existential", color: COLORS.existential, desc: "Intellectual ownership and authorial stance", icon: "✍️", detail: "Assesses practices requiring intellectual ownership: oral defense of written work, revision based on personal investment, authorial stance requirements." },
  { key: "infrastructural", label: "Infrastructural", color: COLORS.infrastructural, desc: "Policy and institutional conditions", icon: "🏛️", detail: "Evaluates perceived institutional support: written AI policy, PD opportunities, administrator messaging, assessment redesign support." },
];

const litDomains = [
  { id: "media", title: "Media Archaeology & Ecology", icon: "🕰️", color: COLORS.rhetorical, theorists: ["Ong", "Kittler", "Ernst", "Parikka", "Huhtamo", "Foucault", "Bolter & Grusin"], concepts: ["Tertiary Algorithmicity", "From Orality to Digital", "Materiality of Media", "Remediation", "The Archive as Process"], connection: "Establishes the historical and materialist depth of how communication technologies restructure consciousness and circulation, moving beyond human authorship.", frameworkDim: "rhetorical" },
  { id: "technoskepticism", title: "Technoskepticism & Surveillance", icon: "👁️", color: COLORS.existential, theorists: ["Postman", "Zuboff", "Turkle", "Carr", "Haidt", "Birkerts", "Illich"], concepts: ["Surveillance Capitalism", "The Shallows / Cognitive Costs", "Behavioral Modification", "Loss of Human Agency", "Frictionless Risks"], connection: "Provides the critical lens to examine the trade-offs of 'frictionless' AI convenience, advocating for the preservation of cognitive struggle.", frameworkDim: "existential" },
  { id: "learning", title: "Cognitive & Learning Theories", icon: "🧩", color: COLORS.noetic, theorists: ["Dewey", "Vygotsky", "Piaget", "Papert", "Sweller", "Siemens", "Hattie"], concepts: ["Constructivism vs. Constructionism", "Cognitive Load Theory", "Connectivism", "Productive Failure", "Visible Learning"], connection: "Grounds the framework in established learning sciences, proving that resistance and 'desirable difficulties' are prerequisites for durable learning.", frameworkDim: "noetic" },
  { id: "literacy", title: "Critical Media Literacy & Pedagogy", icon: "✊", color: COLORS.infrastructural, theorists: ["Freire", "Buckingham", "Kellner & Share", "Jenkins", "ISTE"], concepts: ["Subversive Teaching", "Participatory Culture", "Digital Citizenship", "C.O.R.E. & H.E.A.R.T.", "Algorithmic Awareness"], connection: "Operationalizes the theoretical concerns into actionable pedagogical strategies (C.O.R.E.), empowering students to navigate and critique AI systems.", frameworkDim: "infrastructural" },
];

const participants = [
  { group: "University Students", n: 4, criteria: "Currently enrolled; have used GenAI; can reflect on K–12", rq: "RQ1", dims: ["noetic", "rhetorical", "existential"], pair: "Pair 1 — Learner Perspective" },
  { group: "K–12 Teachers", n: 4, criteria: "Varied content areas, grade bands, poverty levels", rq: "RQ1, RQ2", dims: ["noetic", "rhetorical", "existential", "infrastructural"], pair: "Pair 2 — Practitioner/Leader" },
  { group: "Building Administrators", n: "1–2", criteria: "Principals/APs at schools with varying AI policy maturity", rq: "RQ2, RQ3", dims: ["infrastructural"], pair: "Pair 2 — Practitioner/Leader" },
  { group: "District Leaders", n: 2, criteria: "Curriculum, technology, or superintendent roles", rq: "RQ2, RQ3", dims: ["infrastructural"], pair: "Pair 2 — Practitioner/Leader" },
];

const phases = [
  { num: 1, title: "Concurrent Data Collection", desc: "Interviews, card sort, survey distribution, secondary data compilation", color: COLORS.accent, items: ["Semi-structured interviews (all groups)", "Card sort protocol (teachers & students)", "Teacher survey distribution (N=50–100)", "SPP & RAND secondary data compilation"] },
  { num: 2, title: "Independent Analysis", desc: "Strand-appropriate methods applied separately", color: COLORS.qual, items: ["Thematic coding via PFF lens (a priori + emergent)", "Descriptive statistics & disaggregation", "Cross-tabulation by poverty level", "Cronbach's alpha for survey scales"] },
  { num: 3, title: "Integration", desc: "Joint displays comparing qualitative themes with quantitative patterns", color: COLORS.quan, items: ["Joint display construction by RQ", "Convergence/divergence documentation", "Narrative integration (Chapter 5)", "Meta-inference development"] },
  { num: 4, title: "AI Comparison", desc: "Supplementary strand testing framework claims", color: COLORS.ai, items: ["3 platforms × 4 roles = 12 response sets", "Same codebook applied to AI outputs", "5-indicator structured comparison", "Presentational separation from human data"] },
];

const rqs = [
  { id: "RQ1", text: "How do K–12 teachers and university students understand and navigate the friction-reducing affordances of generative AI in academic work?", qual: "Teacher & student interviews; card sort protocol", quan: "Teacher survey (friction practices scale)", integration: "Survey patterns explained by interview narratives", color: COLORS.noetic },
  { id: "RQ2", text: "What institutional conditions—including policy, assessment design, PD, and leadership disposition—enable or constrain friction-preserving pedagogy?", qual: "Administrator & leader interviews; document analysis", quan: "SPP secondary data (policy/training gaps by poverty)", integration: "National structural patterns contextualized by local institutional accounts", color: COLORS.infrastructural },
  { id: "RQ3", text: "How can the Pedagogical Friction Framework inform AI policy development in K–12 contexts?", qual: "Cross-case synthesis of friction-enabling conditions", quan: "Survey items on policy awareness and utility", integration: "Framework-informed policy recommendations grounded in both strands", color: COLORS.existential },
  { id: "SAQ", text: "When agentic AI systems respond to the same protocols, how do their outputs differ structurally from human practitioner responses?", qual: "AI-generated interview & card sort responses", quan: "AI-generated survey responses", integration: "Structured comparison: human vs. AI discourse analysis", color: COLORS.ai },
];

const aiIndicators = [
  { label: "Experiential Specificity", prediction: "AI will lack specific incidents, students, institutional moments", icon: "📌" },
  { label: "Productive/Exclusionary Distinction", prediction: "AI will acknowledge in general terms but fail context-specific applications", icon: "⚖️" },
  { label: "Institutional Memory", prediction: "AI will default to idealized institutional models", icon: "🏢" },
  { label: "Professional Uncertainty", prediction: "AI will resolve tensions prematurely with artificially clean conclusions", icon: "❓" },
  { label: "Framework Dimension Coverage", prediction: "Exploratory — no directional prediction", icon: "📊" },
];

const timeline = [
  { phase: "Mixed Methods Course", activities: "Draft plan, develop instruments, pilot protocol, begin IRB", timing: "Current semester", status: "active" },
  { phase: "Qualifying Paper", activities: "Complete 10-week QP; pass rubric evaluation", timing: "CCD 697", status: "upcoming" },
  { phase: "Proposal Development", activities: "Write Chapters 1–3; prepare defense; complete CITI", timing: "CCD 698 Term 1", status: "upcoming" },
  { phase: "Proposal Defense + IRB", activities: "Defend proposal; submit IRB/IRRB; receive approval", timing: "CCD 698 Term 1", status: "upcoming" },
  { phase: "Data Collection", activities: "Interviews, survey, secondary data, AI comparison protocol", timing: "CCD 698 Term 2", status: "upcoming" },
  { phase: "Analysis + Writing", activities: "Code qual data, analyze quan, integrate, write Ch. 4–5", timing: "CCD 698 Term 3", status: "upcoming" },
  { phase: "Defense", activities: "Submit full draft, defend, revisions within 90 days", timing: "CCD 698 T3 / 699", status: "upcoming" },
];

const deliverables = [
  { item: "Research plan document", section: "Overall Ch. 3 architecture", status: "in-progress" },
  { item: "Interview protocol with RQ mapping", section: "§3.3.1", status: "to-develop" },
  { item: "Card sort items with dimension mapping", section: "§3.3.2", status: "to-develop" },
  { item: "Survey instrument with pilot results", section: "§3.3.5", status: "to-develop" },
  { item: "SPP/RAND variable mapping", section: "§3.3.4", status: "pilot-complete" },
  { item: "Codebook (a priori codes)", section: "§3.4.1", status: "to-develop" },
  { item: "Integration strategy + joint display", section: "§3.4.3", status: "to-develop" },
  { item: "AI comparison protocol", section: "§3.5", status: "to-develop" },
  { item: "Positionality statement", section: "§3.6", status: "draft" },
  { item: "IRB application draft", section: "§3.7 + Appendices", status: "to-develop" },
];

const statusColors = { "in-progress": COLORS.existential, "to-develop": COLORS.textDim, "pilot-complete": COLORS.qual, draft: COLORS.accent };
const statusLabels = { "in-progress": "In Progress", "to-develop": "To Develop", "pilot-complete": "Pilot Complete", draft: "Draft" };

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "literature", label: "Literature Map" },
  { id: "framework", label: "Framework" },
  { id: "rqs", label: "Research Questions" },
  { id: "design", label: "Design & Phases" },
  { id: "participants", label: "Participants" },
  { id: "ai", label: "AI Comparison" },
  { id: "timeline", label: "Timeline" },
  { id: "deliverables", label: "Deliverables" },
];

function Badge({ children, color }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 4, fontSize: 11, fontFamily: FONTS.mono, fontWeight: 500, background: `${color}22`, color, border: `1px solid ${color}44`, letterSpacing: "0.03em" }}>
      {children}
    </span>
  );
}

function Card({ children, style, onClick, hoverable }) {
  return (
    <div
      onClick={onClick}
      role={hoverable ? "button" : undefined}
      tabIndex={hoverable ? 0 : undefined}
      onKeyDown={(e) => {
        if (hoverable && onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className={hoverable ? "hoverable-card" : ""}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: 20,
        cursor: hoverable ? "pointer" : "default",
        transition: "all 0.2s ease",
        outline: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function OverviewTab() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>{/* unchanged from provided content */}
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Pedagogical Friction in the Age of Generative AI</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, margin: "0 0 16px", lineHeight: 1.5 }}>A Mixed-Methods Collective Instrumental Case Study</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
      {[
        { label: "Design", value: "QUAL + quan", sub: "Convergent Mixed Methods" },
        { label: "Methodology", value: "Case Study", sub: "Collective Instrumental (Stake)" },
        { label: "Participants", value: "12–14", sub: "4 groups, matched pairs" },
        { label: "Philosophy", value: "Pragmatism", sub: "Creswell & Plano Clark, 2018" },
      ].map((s, i) => (
        <Card key={i}><div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{s.label}</div><div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: COLORS.accent, marginBottom: 2 }}>{s.value}</div><div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted }}>{s.sub}</div></Card>
      ))}
    </div>
  </div>;
}

function LiteratureTab() {
  const [activeDomain, setActiveDomain] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: "0 0 6px" }}>Literature Map & Theoretical Foundations</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
        {litDomains.map((domain) => {
          const isActive = activeDomain === domain.id;
          const dim = dimensions.find((d) => d.key === domain.frameworkDim);
          return (
            <Card key={domain.id} hoverable onClick={() => setActiveDomain(isActive ? null : domain.id)} style={{ borderTop: `4px solid ${domain.color}`, ...(isActive ? { background: `${domain.color}08`, borderColor: domain.color } : {}) }}>
              <h3 style={{ fontFamily: FONTS.display, color: domain.color, margin: 0 }}>{domain.icon} {domain.title}</h3>
              {dim && <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: dim.color }}>→ {dim.label} Dimension</div>}
              <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted }}>{domain.connection}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function FrameworkTab() {
  const [selected, setSelected] = useState(null);
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
    {dimensions.map((d) => (
      <Card key={d.key} hoverable onClick={() => setSelected(selected === d.key ? null : d.key)} style={{ borderLeft: `3px solid ${d.color}` }}>
        <span style={{ fontFamily: FONTS.display, color: d.color }}>{d.icon} {d.label}</span>
        <p style={{ color: COLORS.textMuted }}>{selected === d.key ? d.detail : d.desc}</p>
      </Card>
    ))}
  </div>;
}

function RQsTab() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{rqs.map((rq) => <Card key={rq.id}><Badge color={rq.color}>{rq.id}</Badge><p style={{ margin: "8px 0 0" }}>{rq.text}</p></Card>)}</div>;
}

function DesignTab() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{phases.map((p) => <Card key={p.num}><strong style={{ color: p.color }}>{p.num}. {p.title}</strong><p>{p.desc}</p></Card>)}</div>;
}

function ParticipantsTab() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{participants.map((p) => <Card key={p.group}><strong>{p.group} (N={p.n})</strong><p>{p.criteria}</p></Card>)}</div>;
}

function AITab() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{aiIndicators.map((ind) => <Card key={ind.label}><strong>{ind.icon} {ind.label}</strong><p>{ind.prediction}</p></Card>)}</div>;
}

function TimelineTab() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{timeline.map((t) => <Card key={t.phase}><strong>{t.phase}</strong><p>{t.activities}</p></Card>)}</div>;
}

function DeliverablesTab() {
  return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{deliverables.map((d) => <Card key={d.item}><strong>{d.item}</strong><Badge color={statusColors[d.status]}>{statusLabels[d.status]}</Badge></Card>)}</div>;
}

const tabComponents = { overview: OverviewTab, literature: LiteratureTab, framework: FrameworkTab, rqs: RQsTab, design: DesignTab, participants: ParticipantsTab, ai: AITab, timeline: TimelineTab, deliverables: DeliverablesTab };

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const ActiveComponent = tabComponents[activeTab];

  useEffect(() => {
    if (!document.getElementById("google-fonts")) {
      const fontLink = document.createElement("link");
      fontLink.id = "google-fonts";
      fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: FONTS.body, color: COLORS.text }}>
      <style>{`.hoverable-card:hover, .hoverable-card:focus-visible { background-color: ${COLORS.surfaceHover} !important; border-color: ${COLORS.borderAccent} !important; }`}</style>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px" }}>
        <div role="tablist" style={{ display: "flex", gap: 2, marginBottom: 24, overflowX: "auto", borderBottom: `1px solid ${COLORS.border}` }}>
          {tabs.map((tab) => (
            <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "8px 14px", color: activeTab === tab.id ? COLORS.accent : COLORS.textMuted, background: "transparent", border: "none", borderBottom: `2px solid ${activeTab === tab.id ? COLORS.accent : "transparent"}` }}>{tab.label}</button>
          ))}
        </div>
        <div role="tabpanel"><ActiveComponent /></div>
      </div>
    </div>
  );
}
