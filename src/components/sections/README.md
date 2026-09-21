# components/sections

Larger, page-specific content blocks (a homepage section, an about-page
block) that are still worth extracting from the page file for readability —
as opposed to `ui/`, these are not meant to be reused across unrelated pages.

Built so far: the full homepage — `Hero.astro`, `SelectedWork.astro`,
`Gallery.astro`, `CurrentlyWorkingOn.astro`, `HowIThink.astro`,
`ContactCTA.astro` — and the full About page — `AboutIntro.astro`,
`AboutStory.astro`, `AboutProcess.astro`, `AboutDrives.astro` (About also
reuses `ContactCTA.astro` unmodified for its own closing CTA). Work,
case-study, and Contact page sections aren't built yet.
