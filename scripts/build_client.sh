rm -rf output
node -v
npm i -g pnpm
pnpm --filter draw-fe i
pnpm --filter draw-fe build
mkdir output
mkdir output/client
mv ./apps/draw-fe/.next ./output/client/
cp -rL ./apps/draw-fe/node_modules ./output/client/
cp -r ./apps/draw-fe/package.json ./output/client/
cp -r ./apps/draw-fe/public ./output/client/
cp ./ecosystem.config.js ./output/client/

mkdir ./output/static
mkdir ./output/static/.next
cp -r ./output/client/.next/static ./output/static/.next/
cp -r ./output/client/public ./output/static/

# tar -czvf output.tar.gz output/
