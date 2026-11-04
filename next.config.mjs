/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
