/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/login',
            permanent: true,
          },
        ];
    },

    images: {
      domains: ['images.pexels.com'],
    },
};

export default nextConfig;
