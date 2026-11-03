import { redirect } from 'next/navigation'

/**
 * The web assessment is retired: Emma's routine interview replaces it.
 * Old links and bookmarks land on the home page with Emma open and the interview started.
 * (The previous assessment UI is still in components/info/Assessment.tsx if it is ever needed.)
 */
export default function AssessmentPage() {
  redirect('/?routine=start')
}
