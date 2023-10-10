/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  // assetPrefix: `${process.env.NEXT_PUBLIC_BASE_PATH}/`,
  basePath: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  assetPrefix: `${process.env.NEXT_PUBLIC_ASSET_PREFIX}`,
  // images: {
  //   unoptimized: true,
  // }
}
console.log(nextConfig)
module.exports = nextConfig
