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
│   ├── tools.ts           # Main data source - ALL tool definitions (bilingual)
│   ├── translations.ts    # UI strings (bilingual)
│   ├── resourceMapping.ts # Links use cases to external resources
│   └── research/          # Research JSON files for each tool
├── designs/
│   └── linear.tsx         # Main catalog UI component
└── lib/
    ├── i18n.ts            # Localized<T> type and helpers
    └── useLang.ts         # React hook for language switching
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
| Use case resources | `src/data/resourceMapping.ts` | Links to tutorials, guides, videos |
| UI strings | `src/data/translations.ts` | Headers, labels, buttons, filters |
| New categories | Multiple files + `linear.tsx` | Add to translations.ts and update icons/colors |

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

## Resource Mapping (IMPORTANT)

**Every use case MUST have a corresponding resource link.** When adding tools or use cases, always provide a link to a tutorial, guide, video, or documentation that demonstrates the use case.

### Resource Structure
```typescript
// src/data/resourceMapping.ts
interface ResourceLink {
  title: string;   // Descriptive title for the resource
  url: string;     // Full URL to the resource
  type: string;    // guide | tutorial | video | blog | template | tool | course
}

// Index matches casosDeUso array position
existingUseCases: [
  // 0: First use case
  [{ title: "Tutorial Title", url: "https://...", type: "tutorial" }],
  // 1: Second use case
  [{ title: "Guide Title", url: "https://...", type: "guide" }],
  // ...
]
```

### Adding Resources for New Use Cases
1. **Research the use case** - Find a tutorial, guide, or video that demonstrates it
2. **Add to both files**:
   - Add use case text to `tools.ts` (bilingual)
   - Add resource link to `resourceMapping.ts` at the matching index
3. **Verify index alignment** - Comments in resourceMapping.ts should describe each use case
4. **Test with Resources toggle** - Enable the toggle in the catalog footer to verify links appear

### Resource Types
| Type | Description | Example |
|------|-------------|---------|
| `guide` | Official or comprehensive guides | Product documentation |
| `tutorial` | Step-by-step instructions | Medium articles, official tutorials |
| `video` | Video content | YouTube tutorials |
| `blog` | Blog posts with insights | Company blogs, Medium |
| `template` | Pre-built templates/workflows | Zapier templates, n8n workflows |
| `tool` | GitHub repos or tools | Actions, integrations |
| `course` | Paid or free courses | Udemy, Coursera |

### Research Files
Tool research is stored in `src/data/research/*.json` for reference. These files contain the original research used to populate the catalog.

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
- **resources**: One link per use case (tutorial, guide, video, etc.)

### 2. Pricing Verification
- Always check official pricing pages
- If pricing is uncertain or may have changed, add `[VERIFY]`/`[VERIFICAR]` tag:
  ```typescript
  caracteristicas: { en: "Feature X [VERIFY]", es: "Caracteristica X [VERIFICAR]" }
  ```
- Enterprise pricing is often "Custom"/"Personalizado" or "Contact"/"Contactar"

### 3. Research Sources
- **Official sites**: Pricing, features, documentation
- **G2, Capterra**: Real user reviews and use cases
- **Reddit**: Community sentiment and real-world usage
- **Product Hunt**: Launch info and early reviews
- **YouTube**: Tutorials showing actual usage
- **Medium/Dev.to**: Technical tutorials and guides

### 4. Adding to tools.ts
1. Find the appropriate category section (marked with comments like `// CREATIVIDAD`)
2. Add the new tool object with ALL bilingual fields
3. Use proper Spanish accents (á, é, í, ó, ú, ñ) in Spanish text
4. Run `npm run build` to verify TypeScript compiles (catches missing translations)

### 5. Adding to resourceMapping.ts
1. Add a new entry with the tool's ID as key
2. Add `existingUseCases` array with resources matching each use case index
3. Add comments describing each use case for maintainability
4. If no resource found, use `null` (will show X icon when Resources toggle is ON)

### 6. Commit and Deploy
```bash
git add src/data/tools.ts src/data/resourceMapping.ts
git commit -m "Add [ToolName] with resources"
git push
```

### 7. Adding New Categories
**IMPORTANT: Always confirm new category suggestions with the user before implementing.**

If adding a new category (after user approval):
1. Update `Category` type in `tools.ts`
2. Add to `ui.categories` in `translations.ts` (bilingual)
3. Add icon in `categoryIcons` in `linear.tsx`
4. Add color in `categoryColors` in `linear.tsx`

---

## Adding Use Cases to Existing Tools

When adding a single use case to an existing tool:

1. **Add bilingual text to tools.ts**:
   ```typescript
   casosDeUso: {
     en: [
       // ... existing use cases
       "Department: New use case description",
     ],
     es: [
       // ... existing use cases
       "Departamento: Descripcion del nuevo caso de uso",
     ],
   }
   ```

2. **Add resource to resourceMapping.ts** at the matching index:
   ```typescript
   existingUseCases: [
     // ... existing resources
     // N: Department: New use case description
     [{ title: "Resource Title", url: "https://...", type: "guide" }],
   ]
   ```

3. **Verify alignment** - Run the app with Resources toggle ON to check links appear correctly

---

## Content Guidelines

### Bilingual Text Style
- **English**: Clear, professional, concise
- **Spanish**: Use proper accents (á, é, í, ó, ú, ñ)
- Keep both versions similar in length and structure
- Use department prefixes for use cases: "Finance:"/"Finanzas:", "HR:"/"RRHH:", etc.

### Departments Available
`finanzas`, `admin`, `rrhh`, `tech`, `ventas`, `marketing`, `legal`, `operaciones`, `todos`

English equivalents: Finance, Admin, HR, Tech, Sales, Marketing, Legal, Operations, All

### Skill Levels
| Level | English | Spanish |
|-------|---------|---------|
| `principiante` | Beginner | Principiante |
| `intermedio` | Intermediate | Intermedio |
| `avanzado` | Advanced | Avanzado |

---

## UI Features

### Resources Toggle
Located in the catalog footer. When enabled:
- Shows external link icons next to each use case
- Links open in new tab to tutorials, guides, and videos
- Missing resources show an X icon

### Filters
- **Recommendation**: Filter by tier (Top Pick, Great, Good)
- **Category**: Filter by tool category (6 categories)
- **Level**: Filter by skill level (Beginner, Intermediate, Advanced)

### Responsive Design
- Filter pills are smaller on mobile (px-2 py-1 text-xs)
- Grid adapts from 1 to 3 columns based on screen size
