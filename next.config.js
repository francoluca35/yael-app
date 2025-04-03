const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  })
  
  module.exports = withPWA({
    reactStrictMode: true,
    experimental: {
      appDir: true, 
    },
  })

  const nextConfig = {
    reactStrictMode: true,
    // Otras configs que tengas
  };
  module.exports = withPWA(nextConfig);