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
    domains: [
      'images.pexels.com',
      'photos.google.com',
      'photos.fife.usercontent.google.com',
      "images.unsplash.com"
    ],
  },
};

export default nextConfig;
