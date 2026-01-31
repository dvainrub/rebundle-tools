"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Sparkles,
  Zap,
  Search,
  Presentation,
  Code2,
  Layers,
  Globe,
  Check,
  ArrowRight,
} from "lucide-react";
import {
  tools,
  type Category,
  type Tool,
  type RecommendationTier,
} from "@/data/tools";
import { ui } from "@/data/translations";
import { useLang } from "@/lib/useLang";
import { type Lang } from "@/lib/i18n";

// Stripe-style category icons
const categoryIcons: Record<Category, React.ReactNode> = {
  automatizacion: <Zap className="h-4 w-4" />,
  agentes: <Code2 className="h-4 w-4" />,
  conocimiento: <Search className="h-4 w-4" />,
  creatividad: <Presentation className="h-4 w-4" />,
  nocode: <Layers className="h-4 w-4" />,
  desarrollo: <Code2 className="h-4 w-4" />,
};

// Stripe-inspired gradient colors for categories
const categoryGradients: Record<Category, string> = {
  automatizacion: "from-amber-500 to-orange-500",
  agentes: "from-teal-500 to-cyan-500",
  conocimiento: "from-blue-500 to-indigo-500",
  creatividad: "from-purple-500 to-pink-500",
  nocode: "from-pink-500 to-rose-500",
  desarrollo: "from-slate-600 to-slate-800",
};

// Stripe gradient tier badges
const tierGradients: Record<NonNullable<RecommendationTier>, string> = {
  tier1: "from-amber-400 via-yellow-500 to-orange-400",
  tier2: "from-slate-400 via-gray-300 to-slate-400",
  tier3: "from-orange-300 via-amber-400 to-yellow-300",
};

// Skill level colors with gradient style
const levelStyles: Record<string, string> = {
  principiante: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermedio: "bg-amber-50 text-amber-700 border-amber-200",
  avanzado: "bg-rose-50 text-rose-700 border-rose-200",
};

function LanguageToggle({ lang, toggleLang }: { lang: Lang; toggleLang: () => void }) {
  return (
    <motion.button
      onClick={toggleLang}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/50 transition-all hover:bg-white hover:shadow-md"
      title={lang === "en" ? "Switch to Spanish" : "Cambiar a Ingles"}
    >
      <Globe className="h-4 w-4" />
      {lang === "en" ? "ES" : "EN"}
    </motion.button>
  );
}

function GradientBlob({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
    />
  );
}

function ToolCard({ tool, lang, index }: { tool: Tool; lang: Lang; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:ring-slate-300/60 ${
        isExpanded ? "ring-slate-300 shadow-lg" : ""
      }`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-slate-50/50 opacity-0 transition-opacity group-hover:opacity-100" />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative flex w-full items-start justify-between p-6 text-left"
      >
        <div className="flex-1 pr-4">
          {/* Tier badge + Category badge */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {tool.tier && (
              <span
                className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${tierGradients[tool.tier]} px-3 py-1 text-xs font-bold text-white shadow-sm`}
                title={ui.tierDescriptions[tool.tier][lang]}
              >
                {tool.tier === "tier1" && <Sparkles className="h-3 w-3" />}
                {ui.tiers[tool.tier][lang]}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${categoryGradients[tool.categoria]} px-3 py-1 text-xs font-medium text-white shadow-sm`}
            >
              {categoryIcons[tool.categoria]}
              {ui.categories[tool.categoria][lang]}
            </span>
          </div>

          {/* Tool name with gradient text on hover */}
          <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent">
            {tool.nombre}
          </h3>

          {/* Short description */}
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {tool.descripcionCorta[lang]}
          </p>

          {/* Skill level badge */}
          <div className="mt-4">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${levelStyles[tool.nivel]}`}
            >
              {ui.levels[tool.nivel][lang]}
            </span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-slate-200"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-6 pb-6 pt-5">
              {/* Full description */}
              <p className="text-sm leading-relaxed text-slate-700">
                {tool.descripcion[lang]}
              </p>

              {/* Pricing Table - Stripe style with monospace */}
              <div className="mt-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  {ui.card.pricing[lang]}
                </h4>
                <div className="grid gap-2">
                  {tool.precios.map((tier, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 px-4 py-3 ring-1 ring-slate-100"
                    >
                      <span className="text-sm font-semibold text-slate-800">
                        {tier.plan}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-slate-900">
                          {tier.precio}
                        </span>
                        <span className="text-xs text-slate-500">
                          {tier.caracteristicas[lang]}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="mt-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  {ui.card.useCases[lang]}
                </h4>
                <ul className="space-y-2">
                  {tool.casosDeUso[lang].map((caso, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <div className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                      {caso}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Why It's Good */}
              <div className="mt-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  {ui.card.whyItsGood[lang]}
                </h4>
                <div className="grid gap-2">
                  {tool.porQueEsBueno[lang].map((razon, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 px-4 py-3 ring-1 ring-emerald-100/50"
                    >
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-sm text-emerald-800">{razon}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button - Stripe gradient style */}
              <motion.a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/30"
              >
                {ui.card.visit[lang]} {tool.nombre}
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
  count,
  gradient,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
  gradient?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? gradient
            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
            : "bg-slate-900 text-white shadow-lg"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300"
      }`}
    >
      {children}
      {count !== undefined && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}

function CatalogContent() {
  const { lang, toggleLang } = useLang();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTier, setSelectedTier] = useState<RecommendationTier | "all">("all");

  const categories = Object.keys(ui.categories) as Category[];
  const tiers: NonNullable<RecommendationTier>[] = ["tier1", "tier2", "tier3"];

  const filteredTools = tools.filter((t) => {
    if (selectedCategory && t.categoria !== selectedCategory) return false;
    if (selectedTier !== "all") {
      if (selectedTier === null && t.tier !== null) return false;
      if (selectedTier !== null && t.tier !== selectedTier) return false;
    }
    return true;
  });

  // Sort by tier (tier1 first, then tier2, then tier3, then null)
  const sortedTools = [...filteredTools].sort((a, b) => {
    const tierOrder = { tier1: 0, tier2: 1, tier3: 2 };
    const aOrder = a.tier ? tierOrder[a.tier] : 3;
    const bOrder = b.tier ? tierOrder[b.tier] : 3;
    return aOrder - bOrder;
  });

  return (
    <div className="relative min-h-screen bg-white">
      {/* Stripe-style gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GradientBlob className="h-[600px] w-[600px] bg-blue-400 -top-48 -left-48" />
        <GradientBlob className="h-[500px] w-[500px] bg-purple-400 top-20 right-0" />
        <GradientBlob className="h-[400px] w-[400px] bg-pink-400 top-96 left-1/4" />
        <GradientBlob className="h-[350px] w-[350px] bg-orange-400 top-64 right-1/3" />
        <GradientBlob className="h-[450px] w-[450px] bg-cyan-400 -bottom-32 right-1/4" />
      </div>

      {/* Header with gradient text */}
      <header className="relative border-b border-slate-200/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                {ui.header.title[lang]}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
                {ui.header.subtitle[lang]}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <LanguageToggle lang={lang} toggleLang={toggleLang} />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Filter Bar - Sticky with blur */}
      <div className="sticky top-0 z-20 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5">
          {/* Tier Filters */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm font-semibold text-slate-500">
              {ui.filters.recommendation[lang]}
            </span>
            <FilterPill
              active={selectedTier === "all"}
              onClick={() => setSelectedTier("all")}
              gradient
            >
              {ui.filters.all[lang]}
            </FilterPill>
            {tiers.map((tier) => {
              const count = tools.filter((t) => t.tier === tier).length;
              if (count === 0) return null;
              return (
                <FilterPill
                  key={tier}
                  active={selectedTier === tier}
                  onClick={() => setSelectedTier(tier)}
                  count={count}
                >
                  {ui.tiers[tier][lang]}
                </FilterPill>
              );
            })}
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="text-sm font-semibold text-slate-500">
              {ui.filters.category[lang]}
            </span>
            <FilterPill
              active={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
              count={tools.length}
            >
              {ui.filters.all[lang]}
            </FilterPill>
            {categories.map((cat) => {
              const count = tools.filter((t) => t.categoria === cat).length;
              return (
                <FilterPill
                  key={cat}
                  active={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  count={count}
                >
                  {categoryIcons[cat]}
                  {ui.categories[cat][lang]}
                </FilterPill>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Tools Grid */}
      <main className="relative mx-auto max-w-7xl px-6 py-12">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {sortedTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} lang={lang} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {sortedTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <p className="mt-6 text-lg font-medium text-slate-500">
              {ui.empty.noTools[lang]}
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer gradient accent */}
      <div className="pointer-events-none relative h-32">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>
    </div>
  );
}

export default function StripeDesign() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-blue-400 opacity-30 blur-3xl" />
            <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-purple-400 opacity-30 blur-3xl" />
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
