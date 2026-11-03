"""One-off: the web assessment is now Emma's routine builder; reword FAQ and home copy that point to it."""
import re

REPL = [
    (r'Customers can take our oral care assessment if unsure', 'Customers can build a routine with Emma, our oral care advisor, if unsure'),
    (r'Our oral care assessment can help you select', "Emma, our oral care advisor, can build a routine to help you select"),
    (r'Taking our oral care assessment can help determine', 'Building a routine with Emma, our oral care advisor, can help determine'),
    (r'you can take our free oral care assessment <a href=\\"/assessment\\">here', 'you can build a free routine with Emma, our oral care advisor, <a href=\\"/assessment\\">here'),
    (r'You can also take our oral care assessment to see if', 'You can also build a routine with Emma, our oral care advisor, to see if'),
    (r'You can take our free oral care assessment to find', 'You can build a free routine with Emma, our oral care advisor, to find'),
    (r'Take the Assessment \(\+50 SB, once\)', 'Build your routine with Emma (+50 SB, once, coming soon with account sign-in)'),
]

for path in ['components/info/faq-data.ts', 'public/quincer/faqs-full.html']:
    s = open(path, encoding='utf-8').read()
    n = 0
    for a, b in REPL:
        s, k = re.subn(a, b, s)
        n += k
    open(path, 'w', encoding='utf-8').write(s)
    print(path, n, 'changes; assessment mentions left:', len(re.findall('assessment', s, re.I)))

p = 'lib/home-data.ts'
s = open(p, encoding='utf-8').read()
a = '"desc": "Take a quick quiz and get a custom plan from our experts - with oral care products tailored to your age, stage, and needs, ready to be delivered to your door.",\n   "btn": "Take Assessment",'
assert a in s
s = s.replace(a, '"desc": "Answer a few quick questions with Emma, our oral care advisor, and get a routine for each person in your family, with products tailored to their age, stage and needs.",\n   "btn": "Build My Routine",')
open(p, 'w', encoding='utf-8').write(s)
print('home card updated')
