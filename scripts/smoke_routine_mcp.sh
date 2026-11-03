#!/bin/bash
# Smoke test the deployed routine MCP endpoint. Usage: bash scripts/smoke_routine_mcp.sh [url]
export PATH=/Users/gregorypatterson/.nvm/versions/node/v22.22.3/bin:/opt/homebrew/bin:$PATH
U=${1:-https://www.gregorypatterson.com/api/routine-mcp}
T=$(cat ~/Desktop/Emma/routine_mcp_token.txt)
call() { curl -s -m 30 -X POST "$U" -H "authorization: Bearer $T" -H 'content-type: application/json' -d "$1"; echo; }
echo "no auth: $(curl -s -o /dev/null -w '%{http_code}' -X POST "$U" -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}')"
call '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26"}}' | head -c 300; echo
call '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' | grep -o '"name":"[a-z_]*"' | tr '\n' ' '; echo
R=$(call '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"interview_start","arguments":{"routine_code":"AFM LFC"}}}')
echo "$R" | head -c 600; echo
S=$(echo "$R" | python3 -c 'import sys,json; print(json.loads(json.load(sys.stdin)["result"]["content"][0]["text"])["state"])')
R2=$(call "{\"jsonrpc\":\"2.0\",\"id\":4,\"method\":\"tools/call\",\"params\":{\"name\":\"interview_next\",\"arguments\":{\"state\":\"$S\",\"answer\":\"That's right\"}}}")
S2=$(echo "$R2" | python3 -c 'import sys,json; print(json.loads(json.load(sys.stdin)["result"]["content"][0]["text"])["state"])')
call "{\"jsonrpc\":\"2.0\",\"id\":5,\"method\":\"tools/call\",\"params\":{\"name\":\"recommend\",\"arguments\":{\"state\":\"$S2\"}}}" | python3 -c 'import sys,json; d=json.loads(json.load(sys.stdin)["result"]["content"][0]["text"]); print(d["routine_codes"], d["stock_checked"], [(p["system"],p["flavor"],p["url"]) for p in d["people"]])'
