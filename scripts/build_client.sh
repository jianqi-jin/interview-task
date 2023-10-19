rm -rf output
node -v
npm i -g pnpm
pnpm --filter story-fe i
pnpm --filter story-fe build
mkdir output
mkdir output/client
mv ./apps/story-fe/.next ./output/client/
cp -rL ./apps/story-fe/node_modules ./output/client/
cp -r ./apps/story-fe/package.json ./output/client/
cp -r ./apps/story-fe/public ./output/client/
cp ./ecosystem.config.js ./output/client/

mkdir ./output/static
mkdir ./output/static/.next
cp -r ./output/client/.next/static ./output/static/.next/
cp -r ./output/client/public ./output/static/

# tar -czvf output.tar.gz output/
