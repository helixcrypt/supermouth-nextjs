#!/bin/bash
# Recent routine MCP requests from Vercel runtime logs. Usage: bash scripts/routine_logs.sh [count]
export PATH=/Users/gregorypatterson/.nvm/versions/node/v22.22.3/bin:/opt/homebrew/bin:$PATH
cd ~/Desktop/supermouth-nextjs
vercel logs --scope helixcrypt --json -n ${1:-80} 2>/dev/null | /usr/bin/python3 -c '
import sys, json
for line in sys.stdin:
    try: d = json.loads(line)
    except Exception: continue
    if "routine-mcp" not in json.dumps(d): continue
    msgs = d.get("logs") or []
    txt = " ".join((m.get("message") if isinstance(m, dict) else str(m)) for m in msgs)
    keys = {k: d.get(k) for k in ("timestamp", "requestMethod", "responseStatusCode", "message") if d.get(k) is not None}
    print(keys, txt[:300])
'
