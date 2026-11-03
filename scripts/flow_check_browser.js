/**
 * Live flow check for Emma's routine interview, matched to the
 * "Emma Routine Decision Tree" page (main path, exceptions A to I, answer key codes).
 *
 * How to run: open https://www.gregorypatterson.com/?routine=start in a fresh tab
 * (clear sessionStorage first), paste this file into the browser console, then run
 *   await __rt.run(__rt.family)          // page-only, no Quincer calls (Q1 to R1, H, B, C, D, E, F)
 *   await __rt.run(__rt.justMe)          // ends at the handoff; then: await __rt.emma()
 * Each step is [expected text (regex), expected buttons (exact, or null to skip), action].
 * Action "t:Label" taps a button, "y:text" types and sends. A run stops at the first mismatch
 * and returns what it saw, so a failure shows the exact step and wording that differs.
 *
 * When the flow changes: update the decision tree page first, then this file, then the code,
 * then run this check and scripts/test_routine.ts. All three should agree before deploying.
 */
const F = ['Fluoride', 'Fluoride-free', 'No preference'], ST = ['Pregnant', 'Braces or aligners', 'Neither'], YN = ['Yes', 'No']
const GB = ['Go with that', 'Show me the other', 'Tell me more'], FL = ['Mint', 'Strawberry', 'More flavors'], CV = ['0 or 1', '2 or more', 'Not sure']
window.__rt = {
  box: () => document.querySelector('.cw-messages'),
  bots() { return [...this.box().querySelectorAll('.cw-msg-bot')] },
  last() { const b = this.bots(); return (b[b.length - 1]?.innerText || '').trim() },
  chips() { return [...this.box().querySelectorAll('.cw-reply-chips .cw-slot-chip:not([disabled])')].map(c => c.textContent.trim()) },
  sleep: ms => new Promise(r => setTimeout(r, ms)),
  tap(l) { const c = [...this.box().querySelectorAll('.cw-reply-chips .cw-slot-chip:not([disabled])')].find(c => c.textContent.trim() === l); if (!c) return false; c.click(); return true },
  type(t) {
    const i = document.querySelector('.cw-input')
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(i, t)
    i.dispatchEvent(new Event('input', { bubbles: true }))
    i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    return true
  },
  async run(steps) {
    const out = []
    for (const [i, [re, ch, act]] of steps.entries()) {
      await this.sleep(250)
      const t = this.last(), c = this.chips()
      const okT = !re || new RegExp(re, 'i').test(t), okC = !ch || JSON.stringify(c) === JSON.stringify(ch)
      out.push({ i, ok: okT && okC, ...(okT ? {} : { wantText: re, gotText: t.slice(0, 220) }), ...(okC ? {} : { wantChips: ch, gotChips: c }), act })
      if (!(okT && okC)) break
      if (act) { const k = act[0], v = act.slice(2); if (!(k === 't' ? this.tap(v) : this.type(v))) { out.push({ i, err: 'could not ' + act, chips: c }); break } }
    }
    const bad = out.filter(x => !x.ok || x.err)
    return { passed: bad.length === 0 && out.length === steps.length, steps: out.length, of: steps.length, problems: bad }
  },
  /** Wait for Emma's reply to settle (up to 40 s), then return its text and buttons. */
  async emma() {
    const n0 = this.bots().length; let prev = '', st = 0
    for (let k = 0; k < 40; k++) { await this.sleep(1000); const t = this.last(); if (this.bots().length > n0 && t === prev && t.length > 20) { if (++st >= 3) break } else st = 0; prev = t }
    return { text: this.last(), buttons: this.chips() }
  },
  // Family of six: pregnant + braces (E), braces + fluoride-free (D), baby (B), 4-year-old (C, F 0 or 1),
  // 9-year-old (F not sure), teen (C teen braces, F 2 or more), goal screens, recap, change something, start over (H).
  family: [
    ['Who are we putting a routine together for', ['Just me', 'Me and a partner', 'Family with kids'], 't:Family with kids'],
    ['How many adults are in the house', ['Just me', 'Two of us'], 't:Two of us'],
    ['How old is each child', [], 'y:10 months, 4, 9 and 14'],
    ['Are any of these true for you right now', ST, 't:Pregnant'],
    ['Braces or aligners too', YN, 't:Yes'],
    ['Any preference on toothpaste for you\\?', F, 't:No preference'],
    ['Congratulations.*pregnancy system.*OrthoBrush.*ortho mouth spray.*contains fluoride', GB, 't:Go with that'],
    ['Which flavor would you like', FL, 't:Strawberry'],
    ['true for your partner right now', ST, 't:Braces or aligners'],
    ['toothpaste for your partner', F, 't:Fluoride-free'],
    ['ortho formula contains fluoride.*decalcification', ['Stay with ortho', 'Switch to fluoride-free'], 't:Stay with ortho'],
    ['flavor would your partner like', FL, 't:More flavors'],
    ['Which of these', ['Chocolate', 'Vanilla', 'Back to Mint or Strawberry'], 't:Back to Mint or Strawberry'],
    ['flavor would your partner like', FL, 't:Mint'],
    ['flavor would child 1 like', FL, 't:More flavors'],
    ['Which of these', null, 't:Vanilla'],
    ['toothpaste for child 2', F, 't:No preference'],
    ['How many cavities has child 2 had', CV, 't:0 or 1'],
    ['history is good.*fluoride-free system is a great fit for child 2', GB, 't:Show me the other'],
    ['flavor would child 2 like', ['Strawberry', 'Chocolate', 'Vanilla'], 't:Chocolate'],
    ['For child 2, regular floss or easy-grip flossers', ['Flossers', 'Floss'], 't:Flossers'],
    ['toothpaste for child 3', F, 't:No preference'],
    ['cavities has child 3', CV, 't:Not sure'],
    ['Both work well', ['Fluoride', 'Fluoride-free', 'Tell me more'], 't:Fluoride'],
    ['flavor would child 3 like', FL, 't:Strawberry'],
    ['Does child 4 have braces or aligners', YN, 't:No'],
    ['toothpaste for child 4', F, 't:No preference'],
    ['cavities has child 4', CV, 't:2 or more'],
    ['fluoride is the usual choice for child 4', GB, 't:Go with that'],
    ['flavor would child 4 like', FL, 't:Mint'],
    ['What matters most', ['Cavity prevention', 'Gum health', 'More options'], 't:More options'],
    ['Which of these matters most', ['Sensitivity', 'Whitening', 'More options'], 't:More options'],
    ['Which of these matters most', ['Fresh breath', 'Clean ingredients', 'Back to the first ones'], 't:Back to the first ones'],
    ['What matters most', null, 't:Cavity prevention'],
    ['How is brushing going', ['Pretty solid', 'Room to build'], 't:Room to build'],
    ['routine codes: PNSB AOM BNV LFC KFS AFM', ["That's right", 'Change something', 'Start over'], 't:Change something'],
    ['Whose answers should we change.*6\\. child 4', [], 'y:6'],
    ['Does child 4 have braces or aligners', YN, 't:Yes'],
    ['toothpaste for child 4', F, 't:Fluoride'],
    ['flavor would child 4 like', FL, 't:Mint'],
    ['routine codes: PNSB AOM BNV LFC KFS AOM', null, 't:Start over'],
    ['Who are we putting a routine together for', ['Just me', 'Me and a partner', 'Family with kids'], null],
  ],
  // One adult through to the handoff (main path 1 to 8). Calls Quincer once at the end.
  justMe: [
    ['Who are we putting a routine together for', null, 't:Just me'],
    ['true for you right now', ST, 't:Neither'],
    ['toothpaste for you\\?', F, 't:Fluoride'],
    ['flavor would you like', FL, 't:Mint'],
    ['What matters most', null, 't:Gum health'],
    ['brushing going', null, 't:Pretty solid'],
    ['routine code: AFM', ["That's right", 'Change something', 'Start over'], "t:That's right"],
  ],
}
