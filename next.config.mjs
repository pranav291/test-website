/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ltalucknow.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/**',
      },
    ],
  },
  env: {
    MONGODB_URI: "mongodb://mongo:SZtuolEfsNFowavriuWFaeRvZTVzSdDo@tramway.proxy.rlwy.net:51073",
    JWT_SECRET: "strong_jwt_secret_dta_2026",
  },
}

export default nextConfig
