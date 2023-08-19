/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  env: {
    NEXTAUTH_SECRET: "my_ultra_secure_nextauth_secret",
    NEXTAUTH_URL: "https://front-end-823u-7kqrqqipo-somecoder123.vercel.app/",
    API_URL: "https://342dcfrwewdcvfrdf.org/api/v1",
    LOGIN_URL: "https://342dcfrwewdcvfrdf.org/api/v1/users/login",
    PUBLIC_LINK: "/",
    CURRENT_DOMAIN: "",
    // api_link: ***********,
    // public_link:***********,
    // current_domain:*******,
  },
};

module.exports = nextConfig;
