/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'citigym.com.vn',
          pathname: '/storage/uploads/**', // Điều chỉnh theo đường dẫn cụ thể nếu cần
        },

        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '/**', // Cho phép tất cả đường dẫn từ hostname này
          },
      ],
    },
  };

export default nextConfig;
