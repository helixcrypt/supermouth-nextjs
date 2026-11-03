"""One-off: relabel the old assessment links as Emma's routine builder."""
import re
p = 'components/Navbar.tsx'
s = open(p).read()
pairs = [
    ("{ label: 'Take an Assessment', href: '/assessment' }", "{ label: 'Build My Routine with Emma', href: '/assessment' }"),
    ('Take an assessment to get a personalized routine for your family in 2 minutes.', 'Build a personalized routine for your family with Emma in about 2 minutes.'),
    ('Take an Assessment to learn about your dental needs', "Build your family's routine with Emma"),
    ('>\n                    Take an Assessment\n', '>\n                    Build My Routine\n'),
]
for a, b in pairs:
    assert a in s, a
    s = s.replace(a, b)
n = s.count('TAKE ASSESSMENT')
s = s.replace('TAKE ASSESSMENT', 'BUILD MY ROUTINE')
open(p, 'w').write(s)
print('navbar: replaced', n, 'buttons')

p = 'app/what-makes-us-super/page.tsx'
s = open(p).read()
a = 'take our assessment for each family member to see what are the best products for you'
assert a in s
s = s.replace(a, 'build a routine with Emma for each family member to see which products fit them best')
open(p, 'w').write(s)

p = 'app/rewards/page.tsx'
s = open(p).read()
a = "{ t: 'take the assessment:', d: '+50 SB (one time)' }"
assert a in s
s = s.replace(a, "{ t: 'build your routine with Emma:', d: '+50 SB (one time, coming soon with account sign-in)' }")
open(p, 'w').write(s)
print('done')
