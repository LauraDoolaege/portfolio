// The one place for the ways to reach Laura. Build-time only (import from frontmatter, never from a client script).
// Both links are always shown. Until the real targets exist they are placeholders:
//   - CV: points at `public/cv.pdf`, so it starts working the moment that file is added
//   - LinkedIn: `linkedin` below
import { withBase } from './url';

export const email = 'laura.doolaege@student.howest.be';

/** Public profile URL (without the ?isSelfProfile flag, which only shows your own view of the page) */
export const linkedin = 'https://www.linkedin.com/in/laura-doolaege/';

/** Add the PDF at public/cv.pdf */
export const cvHref = withBase('/cv.pdf');
