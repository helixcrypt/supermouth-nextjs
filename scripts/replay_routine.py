"""Replay answers against the deployed routine MCP and print each tool reply.
Usage: python3 scripts/replay_routine.py "Just me" "Neither" ..."""
import json, os, sys, urllib.request

URL = os.environ.get('ROUTINE_URL', 'https://www.gregorypatterson.com/api/routine-mcp')
TOKEN = open(os.path.expanduser('~/Desktop/Emma/routine_mcp_token.txt')).read().strip()


def call(name, args, i=[0]):
    i[0] += 1
    body = json.dumps({'jsonrpc': '2.0', 'id': i[0], 'method': 'tools/call', 'params': {'name': name, 'arguments': args}}).encode()
    req = urllib.request.Request(URL, data=body, method='POST', headers={'content-type': 'application/json', 'authorization': 'Bearer ' + TOKEN})
    with urllib.request.urlopen(req, timeout=60) as r:
        res = json.load(r)['result']
    return json.loads(res['content'][0]['text']), res.get('isError')


out, err = call('interview_start', {})
print('START', json.dumps(out)[:400])
for a in sys.argv[1:]:
    out, err = call('interview_next', {'state': out['state'], 'answer': a})
    print('\nANSWER', a, '-> isError', err, 'bytes', len(json.dumps(out)))
    print(json.dumps(out, indent=1)[:1500])
    if out.get('step') == 'done':
        rec, err = call('recommend', {'state': out['state']})
        print('\nRECOMMEND bytes', len(json.dumps(rec)), json.dumps(rec)[:1500])
