/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const { withSentryConfig } = require("@sentry/nextjs");
const moduleExports = {
  nextConfig: nextConfig,
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
