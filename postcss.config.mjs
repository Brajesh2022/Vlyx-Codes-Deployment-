/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    // autoprefixer is generally recommended and Next.js might add it automatically
    // if not present, but explicitly adding it here based on the original postcss.config.js
    autoprefixer: {},
  },
};

export default config;
