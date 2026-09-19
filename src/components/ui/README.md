# components/ui

Small, generic, reusable primitives with no page-specific content: buttons,
tags/pills, form elements. A component belongs here if it could plausibly be
used on more than one page and takes all its content via props.

Built so far: `Button.astro` (primary hairline/fill + secondary underline),
`Tag.astro` (bracket label chip), `ProjectCard.astro` (the brief's
"ticket-card" module — image, number, title, role tag, year), `SectionMarker.astro`
(numbered running-head used at the top of each homepage section). Add more
only when a real page needs them, not in advance.
