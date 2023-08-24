/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  env: {
    NEXTAUTH_SECRET: "my_ultra_secure_nextauth_secret",
    NEXTAUTH_URL: process.env.NODE_ENV === "development" ? "http://localhost:3000" :
      "https://front-end-823u-2iqilocfd-somecoder123.vercel.app/",
    API_URL: process.env.NODE_ENV === "development" ? "http://localhost:5000/api/v1" :
      "https://342dcfrwewdcvfrdf.org/api/v1",
    LOGIN_URL: process.env.NODE_ENV === "development" ? "http://localhost:5000/api/v1/users/login" :
      "https://342dcfrwewdcvfrdf.org/api/v1/users/login",
    PUBLIC_LINK: "/",
    CURRENT_DOMAIN: "",
    // api_link: ***********,
    // public_link:***********,
    // current_domain:*******,
  },
};

module.exports = nextConfig;
