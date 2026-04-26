# Business Owners "More" page assets

Drop final assets into this folder using the exact filenames below. The page already references these paths — once the files exist, the placeholders in the live page swap to the real images automatically.

## Tabs section ("What we did")

Recommended size: 1280×800 (16:10), PNG or JPG. Each image illustrates one course pillar.

- `tab-ai-literacy.png` — AI literacy foundations
- `tab-prompt-design.png` — Prompt design for business problems
- `tab-output-evaluation.png` — Output evaluation & quality checks
- `tab-risk-identification.png` — AI risk identification
- `tab-application.png` — Applying AI to your operations

## Sample materials section

Currently rendered as four labeled gray placeholder tiles. To replace, add a `src` field to the matching item in `src/app/business-owners-more/page.tsx` (`content.sampleMaterials`). Suggested filenames:

- `curriculum-map.png` — visual index of every module
- `explainer-video.mp4` — short course intro video (set `kind: "video"` on the item)
- `interactive-activity.png` — screenshot of an in-course exercise
- `practice-workbench.png` — screenshot of the AI practice sandbox

## Hero image

The hero currently reuses `/media/cards/business-owners.png`. To swap for a page-specific hero, drop `hero.png` here and update `content.hero.image.src` in the page file.
