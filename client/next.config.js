/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
    // Увеличиваем таймаут для загрузки изображений
    minimumCacheTTL: 60,
  },
  // Игнорирование системных файлов Windows для Watchpack
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/DumpStack.log.tmp',
        '**/System Volume Information/**',
        '**/hiberfil.sys',
        '**/pagefile.sys',
        '**/swapfile.sys',
      ],
      aggregateTimeout: 300,
      poll: 1000,
    };
    return config;
  },
}

module.exports = nextConfig

