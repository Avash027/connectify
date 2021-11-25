const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://connectify-socialmedia.herokuapp.com";

module.exports = baseUrl;
