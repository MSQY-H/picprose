/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // 根据环境变量动态设置 basePath
  basePath: process.env.CF_PAGES ? '' : '/picprose',
  assetPrefix: process.env.CF_PAGES ? '' : '/picprose',
};

export default nextConfig;