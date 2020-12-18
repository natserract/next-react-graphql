const Dotenv = require("dotenv-webpack");
const withImages = require('next-images')

const nextConfig = withImages({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    });

    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  }
});

module.exports = nextConfig;
