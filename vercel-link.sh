#!/bin/bash
cd ~/Desktop/supermouth-nextjs

# Create .vercel dir and project link manually
mkdir -p .vercel

# We'll let vercel CLI detect the project from git remote
# Just do the deploy directly — Vercel auto-detects helixcrypt/supermouth-nextjs from the git remote
git add -A
git commit --allow-empty -m "Restore supermouth site to Vercel"
git push origin main

echo "Done — check vercel.com/helixcrypt/supermouth-nextjs for deploy status"
