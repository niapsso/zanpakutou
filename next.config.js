/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
  },
  images: {
    domains: ["zampakutou.s3.sa-east-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
