const envConfig = require("dotenv");

module.exports = {
  output: "export",
  trailingSlash: true,
  compress: true,
  pageExtensions: ["tsx"],
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  compiler: {
    styledComponents: {
      displayName: true,
      fileName: true,
    },
  },
  env: {
    ...envConfig.parsed,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};
