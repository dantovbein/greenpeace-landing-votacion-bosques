/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  assetPrefix: `${process.env.NEXT_PUBLIC_BASE_PATH}/`,
  // assetPrefix: `/sk/votacion-bosques/`,
  // images: {
  //   unoptimized: true,
  // }
}

module.exports = nextConfig
