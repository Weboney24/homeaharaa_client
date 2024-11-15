/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
    CUSTOMER_URL: process.env.CUSTOMER_URL,
    UPLOAD_BASE_URL: process.env.UPLOAD_BASE_URL,
    CURRENCY_API: process.env.CURRENCY_API,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    RAZOR_PAY_KEY: process.env.RAZOR_PAY_KEY,
    RAZOR_PAY_SECRET_KEY: process.env.RAZOR_PAY_SECRET_KEY,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msmwebfiles.s3.amazonaws.com"
      }
    ]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
