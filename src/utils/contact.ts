// The one place for the ways to reach Laura. Build-time only (import from frontmatter, never from a client script).
// Both links are always shown. Until the real targets exist they are placeholders:
//   - CV: points at `public/cv.pdf`, so it starts working the moment that file is added
//   - LinkedIn: `linkedin` below, set to the profile URL (until then the link goes nowhere)
import { withBase } from './url';

export const email = 'laura.doolaege@student.howest.be';

/** Full profile URL, e.g. 'https://www.linkedin.com/in/your-name'. Placeholder until it is known. */
export const linkedin = '#';

/** Add the PDF at public/cv.pdf */
export const cvHref = withBase('/cv.pdf');
