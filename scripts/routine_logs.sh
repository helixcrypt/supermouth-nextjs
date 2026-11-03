#!/bin/bash
# Recent routine MCP log lines from Vercel. Usage: bash scripts/routine_logs.sh [lines]
export PATH=/Users/gregorypatterson/.nvm/versions/node/v22.22.3/bin:/opt/homebrew/bin:$PATH
cd ~/Desktop/supermouth-nextjs
vercel logs --scope helixcrypt --json -n 150 2>/dev/null | /usr/bin/python3 -c '
import sys, json, time
rows = []
for l in sys.stdin:
    try: d = json.loads(l)
    except Exception: continue
    if d.get("requestPath") != "/api/routine-mcp": continue
    msgs = [m.get("message", "") for m in (d.get("logs") or []) if isinstance(m, dict)] or [d.get("message") or ""]
    for m in msgs:
        if "routine" in m and "routine_headers" not in m:
            rows.append((d["timestamp"], m))
for ts, m in sorted(rows)[-int(sys.argv[1] if len(sys.argv) > 1 else 12):]:
    print(time.strftime("%H:%M:%S", time.localtime(ts / 1000)), m[:500])
' "${1:-12}"
