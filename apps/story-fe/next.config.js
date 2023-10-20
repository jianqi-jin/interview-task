/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
  //   return config;
  // },
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
    });
    return config;
  },
};

module.exports = nextConfig;
