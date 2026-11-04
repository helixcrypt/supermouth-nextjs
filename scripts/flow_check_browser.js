/**
 * Live flow check for Emma's routine interview, version 2, matched to the
 * "Emma Routine Flow v2" page (main path steps, exceptions A to I, answer key codes).
 *
 * How to run: open https://www.gregorypatterson.com/?routine=start in a fresh tab (clear
 * sessionStorage first), paste this file into the browser console, then:
 *   await __rt.runFamily()          // four people: adult (simplify, smaller), baby, teen in braces, little kid
 * Each step is [expected text in Emma's latest message (regex), expected buttons (exact list, or null),
 * action]. An action is a button label, or a list of labels tapped in order (multi-select and the
 * morning/day/night pickers). Steps that wait on the server ("system") pause until the next buttons
 * appear. A run stops at the first mismatch and returns what it saw.
 *
 * When the flow changes: update the flow page first, then this file, then the code, then run this
 * check and scripts/test_routine2.ts. All three should agree before deploying.
 * Note: the family run adds four Systems to the test store's cart.
 */
const PICK = ['🪥 Brush / toothpaste', '🧵 Floss', '🫙 Mouthwash', '👅 Tongue cleaner', '💨 Mouth spray', '💧 Water flosser', 'Done']
const WHO = ['Me', 'My child', 'Another adult in my family']
const CAV = ['None in the last few years', 'One or more recently', 'Doctor says higher risk', 'Not sure']
const CON = ['Sensitivity', 'Bleeding gums', 'Dry mouth', 'Bad breath', 'Staining', 'None of these', 'Something else', 'Done']
const FLU = ['Fluoride', 'Fluoride-free', 'Recommend for me']
const FL4 = ['🌿 Mint', '🍓 Strawberry', '🍦 Vanilla', '🍫 Chocolate'], FL3 = ['🍓 Strawberry', '🍦 Vanilla', '🍫 Chocolate']
const OK = ["That's right", 'Let me fix something'], MAN = ['Yes, that works', 'Not quite'], GO = ['Yes, go on', 'I have a question']
const BUY = ['Add to cart', 'Show me a smaller option'], MORE = ['Add a family member', "I'm done"]
const pick = tod => [...PICK, `Nothing ${tod === 'day' ? 'during the day' : tod === 'morning' ? 'in the morning' : 'at night'}`, 'Something else']

window.__rt = {
  box: () => document.querySelector('.cw-messages'),
  last() { const b = [...this.box().querySelectorAll('.cw-msg-bot')]; return (b[b.length - 1]?.innerText || '').trim() },
  chips() { return [...this.box().querySelectorAll('.sm-routine-chips .cw-slot-chip:not([disabled])')].map(c => c.textContent.trim().replace(/^\d+\. /, '')).filter(c => c !== '← Back') },
  sleep: ms => new Promise(r => setTimeout(r, ms)),
  tap(l) { const c = [...this.box().querySelectorAll('.sm-routine-chips .cw-slot-chip:not([disabled])')].find(c => c.textContent.trim().replace(/^\d+\. /, '') === l); if (!c) return false; c.click(); return true },
  async waitChips(ms = 15000) { for (let t = 0; t < ms; t += 300) { if (this.chips().length) return true; await this.sleep(300) } return false },
  async run(steps) {
    const out = []
    for (const [i, [re, ch, act]] of steps.entries()) {
      await this.sleep(300); await this.waitChips()
      const t = this.last(), c = this.chips()
      const okT = !re || new RegExp(re, 'i').test(t), okC = !ch || JSON.stringify(c) === JSON.stringify(ch)
      if (!(okT && okC)) { out.push({ i, wantText: okT ? undefined : re, gotText: t.slice(0, 200), wantChips: okC ? undefined : ch, gotChips: c }); break }
      for (const a of [].concat(act || [])) { if (!this.tap(a)) { out.push({ i, err: 'no button ' + a, chips: this.chips() }); return { passed: false, problems: out } } await this.sleep(120) }
    }
    return { passed: out.length === 0, steps: steps.length, problems: out }
  },
  family: [
    // 1. Me: brush morning and night, floss at night; drop the mouthwash (B), then pick Basic (B smaller)
    ['Is this for you or someone in your family', WHO, 'Me'],
    ['In the morning', pick('morning'), ['🪥 Brush / toothpaste', 'Done']],
    ['During the day', pick('day'), 'Nothing during the day'],
    ['at night', pick('night'), ['🧵 Floss', '🪥 Brush / toothpaste', 'Done']],
    ['cavities recently', CAV, 'None in the last few years'],
    ['dealing with', CON, ['Sensitivity', 'Done']],
    ['special considerations', ['Braces', 'Clear aligners', 'Pregnancy', 'None', 'Something else', 'Done'], 'None'],
    ['Prefer fluoride', FLU, 'Recommend for me'],
    ['Which flavor', FL4, '🌿 Mint'],
    ["Here's what I heard: you're an adult.*sensitivity.*Routine code ANM", OK, "That's right"],
    ['Does that feel manageable', MAN, 'Not quite'],
    ['Which part feels hard', ['The tongue cleaner in the morning', 'The mouth spray during the day', 'The mouthwash at night', "It's the time it takes", 'Something else', 'Done'], ['The mouthwash at night', 'Done']],
    ['Better\\?', ['Yes, that works', 'Still too much'], 'Yes, that works'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['How does that sound', BUY, 'Show me a smaller option'],
  ],
}
// The smaller-option buttons carry live prices, so the rest of the family run looks up the Basic
// button by its start. Run everything with: await __rt.runFamily()
__rt.runFamily = async function () {
  const a = await this.run(this.family); if (!a.passed) return a
  await this.waitChips(); const basic = this.chips().find(c => /^Basic/.test(c)); if (!basic) return { passed: false, problems: [{ err: 'no Basic option', chips: this.chips() }] }
  const b = await this.run([
    ['smaller Systems', null, basic],
    ["Done\\. It's in your cart\\. Would you like help with anyone else", MORE, 'Add a family member'],
    // 2. Baby (exception A): teeth, teething, flavor, recap, short routine with a teether
    ["Who's next", ['My child', 'Another adult in my family'], 'My child'],
    ['How old are they', ['Baby or toddler (0 to 2)', 'Little kid (2 to 5)', 'Big kid (6 to 12)', 'Teen (13+)'], 'Baby or toddler (0 to 2)'],
    ['How many teeth', ['None yet', 'A few', '6 to 8', 'More than 8'], 'A few'],
    ['Teething right now', ['Yes', 'No'], 'Yes'],
    ['Which flavor', FL3, '🍓 Strawberry'],
    ["baby or toddler with a few teeth, teething right now.*Routine code BNS", OK, "That's right"],
    ['Does that feel manageable', MAN, 'Yes, that works'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['How does that sound', BUY, 'Add to cart'],
    ['anyone else', MORE, 'Add a family member'],
    // 3. Teen in braces, fluoride-free (F: braces + fluoride-free stays fluoride-free)
    ["Who's next", null, 'My child'],
    ['How old are they', null, 'Teen (13+)'],
    ['In the morning', null, ['🪥 Brush / toothpaste', 'Done']],
    ['During the day', null, 'Nothing during the day'],
    ['at night', null, ['🪥 Brush / toothpaste', 'Done']],
    ['cavities recently', CAV, 'Not sure'],
    ['dealing with', CON, 'None of these'],
    ['special considerations', null, ['Braces', 'Done']],
    ['Prefer fluoride', FLU, 'Fluoride-free'],
    ['Which flavor', FL4, '🍫 Chocolate'],
    ["they're a teen, in braces or aligners.*Routine code ANC", OK, "That's right"],
    ['Does that feel manageable', MAN, 'Yes, that works'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['How does that sound', BUY, 'Add to cart'],
    ['anyone else', MORE, 'Add a family member'],
    // 4. Little kid, recommend with recent cavities -> fluoride, no mint, flossers (C)
    ["Who's next", null, 'My child'],
    ['How old are they', null, 'Little kid (2 to 5)'],
    ['In the morning', null, 'Nothing in the morning'],
    ['During the day', null, 'Nothing during the day'],
    ['at night', null, ['🪥 Brush / toothpaste', 'Done']],
    ['cavities recently', CAV, 'One or more recently'],
    ['dealing with', CON, 'None of these'],
    ['special considerations', ['Braces', 'Clear aligners', 'None', 'Something else', 'Done'], 'None'],
    ['Prefer fluoride', FLU, 'Recommend for me'],
    ['Which flavor', FL3, '🍫 Chocolate'],
    ["they're a little kid, with recent cavities.*Routine code LFC", OK, "That's right"],
    ['Does that feel manageable', MAN, 'Yes, that works'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['Make sense so far', GO, 'Yes, go on'],
    ['How does that sound', BUY, 'Add to cart'],
    ['anyone else', MORE, "I'm done"],
    ["You're set\\. Your routine codes: ANM BNS ANC LFC", ['View my cart'], null],
  ])
  return b
}
