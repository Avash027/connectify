const withPWA = require("next-pwa");

module.exports = withPWA({
  env: {
    CLOUDINARY_URL: `https://api.cloudinary.com/v1_1/dxdpj87op/image/upload`,
  },
  pwa: {
    dest: "public",
    register: true,
    sw: "/sw.js",
    scope: "/app",
  },
  ignoreBuildErrors: true,
});
