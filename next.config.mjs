/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't.me', // Telegram
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google
      },
    ],
  },
  experimental: {
    appDir: true, // <-- включаем App Router
  },
};

export default nextConfig;
