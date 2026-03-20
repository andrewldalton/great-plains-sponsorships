#!/bin/bash
export PATH="/Users/andrewdalton/.nvm/versions/node/v20.20.1/bin:$PATH"
cd /Users/andrewdalton/CLAUDE/great-plains-sponsorships

echo "=== Building ==="
npx next build 2>&1 | tail -25

echo ""
echo "=== Deploying to Cloudflare ==="
npx wrangler pages deploy out --project-name great-plains-sponsorships 2>&1 | tail -10

echo ""
echo "=== Restoring files ==="
mv src/app/_api_disabled src/app/api 2>/dev/null
mv src/app/_robots_disabled.ts src/app/robots.ts 2>/dev/null
mv src/app/_sitemap_disabled.ts src/app/sitemap.ts 2>/dev/null
sed -i '' '/  output: "export",/d' next.config.ts
echo "Done!"
