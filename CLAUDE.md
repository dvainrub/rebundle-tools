# Rebundle Tools

AI Tools Catalog for Rebundle - showcasing recommended AI tools organized by category and tier.

## Stack
- Next.js 16 + React 19
- Tailwind CSS 4
- Framer Motion
- Lucide React icons

## Commands
```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
```

## Project Structure
```
src/
├── app/           # Next.js app router
├── components/    # UI components
├── data/
│   ├── tools.ts       # Main data source - ALL tool definitions (bilingual)
│   └── translations.ts # UI strings (bilingual)
├── designs/
│   └── catalog2.tsx   # Main catalog UI component
└── lib/
    ├── i18n.ts        # Localized<T> type and helpers
    └── useLang.ts     # React hook for language switching
```

## Code Quality
When making changes, use these Claude Code skills:
- `/vercel-react-best-practices` - React/Next.js performance optimization
- `/web-design-guidelines` - Accessibility and UI best practices

## Deployment
- **Live:** https://rebundle-tools.vercel.app
- **GitHub:** https://github.com/dvainrub/rebundle-tools
- Auto-deploys from `main` branch to Vercel
- **Always commit and push changes to trigger deployment**

---

## Internationalization (i18n)

### Language Support
- **Default:** English (rebundle-tools.vercel.app)
- **Spanish:** rebundle-tools.vercel.app?lang=es
- Toggle button in header switches between languages

### Colocated Translations Pattern
All content uses the `Localized<T>` type to ensure both languages are always in sync:

```typescript
// src/lib/i18n.ts
type Localized<T> = { en: T; es: T };

// Usage in tools.ts - BOTH languages required
descripcion: {
  en: "AI-powered search engine...",
  es: "Motor de búsqueda con IA...",
},
```

**Benefits:**
- TypeScript enforces both languages exist for every field
- Impossible to add content in one language without the other
- No separate translation files to get out of sync
- When editing, both languages visible in same location

### Files to Update for Content Changes

| Content Type | File | Notes |
|-------------|------|-------|
| Tool data | `src/data/tools.ts` | All tool descriptions, use cases, pricing |
| UI strings | `src/data/translations.ts` | Headers, labels, buttons, filters |
| New categories | Both files + `catalog2.tsx` | Add to translations.ts and update icons/colors |

### Adding New Tools (Bilingual)
When adding a new tool, provide BOTH English and Spanish for:
- `descripcion: { en: "...", es: "..." }`
- `descripcionCorta: { en: "...", es: "..." }`
- `casosDeUso: { en: [...], es: [...] }`
- `porQueEsBueno: { en: [...], es: [...] }`
- `precios[].caracteristicas: { en: "...", es: "..." }`

Use parallel agents to research and write both versions simultaneously.

---

## Tool Catalog Structure

### Categories (6 total)
| Category | Description | Icon Color |
|----------|-------------|------------|
| `automatizacion` | Workflow automation (Make, Zapier, n8n) | Amber |
| `agentes` | Autonomous AI agents (Genspark, Manus, Claude Co-Work) | Teal |
| `conocimiento` | Knowledge & data tools (Perplexity, NotebookLM, Notion AI, Rows) | Blue |
| `creatividad` | Content creation (Gamma, Canva, HeyGen, ElevenLabs) | Purple |
| `nocode` | App builders (Lovable, Base44) | Pink |
| `desarrollo` | Developer tools (Claude Code, Cursor) | Slate |

### Tiers
| Tier | Label (EN/ES) | Description |
|------|---------------|-------------|
| `tier1` | Top Pick | Highly Recommended / Altamente Recomendado |
| `tier2` | Great | Recommended / Recomendado |
| `tier3` | Good | Optional / Opcional |

### Tool Interface
```typescript
interface Tool {
  id: string;                           // Unique identifier (lowercase, hyphenated)
  nombre: string;                       // Display name (same in both languages)
  url: string;                          // Official website
  descripcion: Localized<string>;       // Full description (2-3 sentences)
  descripcionCorta: Localized<string>;  // Short tagline (5-7 words)
  categoria: Category;                  // One of 6 categories
  nivel: SkillLevel;                    // principiante | intermedio | avanzado
  tier: RecommendationTier;             // tier1 | tier2 | tier3
  departamentos: Department[];          // Target departments
  precios: PricingTier[];               // Pricing plans (caracteristicas is Localized)
  casosDeUso: Localized<string[]>;      // Use cases prefixed by department
  porQueEsBueno: Localized<string[]>;   // Why it's good (4 bullet points)
}
```

---

## Adding New Tools

### 1. Research Phase (Parallel Agents)
Use parallel agents to research multiple tools simultaneously:

```
Launch 3 agents in parallel:
- Agent 1: Research Tool A
- Agent 2: Research Tool B
- Agent 3: Research Tool C
```

Each agent should gather for BOTH languages:
- **descripcion**: 2-3 sentences explaining what it does
- **descripcionCorta**: 5-7 word tagline
- **precios**: Current pricing tiers from official site (caracteristicas bilingual)
- **casosDeUso**: 5-6 use cases prefixed by department
- **porQueEsBueno**: 4 real differentiators based on reviews/community

### 2. Pricing Verification
- Always check official pricing pages
- If pricing is uncertain or may have changed, add `[VERIFY]`/`[VERIFICAR]` tag:
  ```typescript
  caracteristicas: { en: "Feature X [VERIFY]", es: "Característica X [VERIFICAR]" }
  ```
- Enterprise pricing is often "Custom"/"Personalizado" or "Contact"/"Contactar"

### 3. Research Sources
- **Official sites**: Pricing, features
- **G2, Capterra**: Real user reviews and use cases
- **Reddit**: Community sentiment and real-world usage
- **Product Hunt**: Launch info and early reviews
- **YouTube**: Tutorials showing actual usage

### 4. Adding to tools.ts
1. Find the appropriate category section (marked with comments like `// CREATIVIDAD`)
2. Add the new tool object with ALL bilingual fields
3. Use proper Spanish accents (á, é, í, ó, ú, ñ) in Spanish text
4. Run `npm run build` to verify TypeScript compiles (catches missing translations)
5. Commit and push to deploy

### 5. Adding New Categories
**IMPORTANT: Always confirm new category suggestions with the user before implementing.**

If adding a new category (after user approval):
1. Update `Category` type in `tools.ts`
2. Add to `ui.categories` in `translations.ts` (bilingual)
3. Add icon in `categoryIcons` in `catalog2.tsx`
4. Add color in `categoryColors` in `catalog2.tsx`

---

## Content Guidelines

### Bilingual Text Style
- **English**: Clear, professional, concise
- **Spanish**: Use proper accents (á, é, í, ó, ú, ñ)
- Keep both versions similar in length and structure
- Use department prefixes for use cases: "Finance:"/"Finanzas:", "HR:"/"RRHH:", etc.

### Departments Available
`finanzas`, `admin`, `rrhh`, `tech`, `ventas`, `marketing`, `legal`, `operaciones`, `todos`

### Skill Levels
| Level | English | Spanish |
|-------|---------|---------|
| `principiante` | Beginner | Principiante |
| `intermedio` | Intermediate | Intermedio |
| `avanzado` | Advanced | Avanzado |
