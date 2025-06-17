/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sys/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
