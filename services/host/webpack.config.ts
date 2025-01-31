import path from "path";
import webpack from "webpack";
import {
  BuildOptions,
  BuildPaths,
  BuildMode,
  BuildPlatform,
  buildWebpackAsync,
} from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables {
  mode?: BuildMode;
  analyzer?: boolean;
  port?: number;
  platform?: BuildPlatform;
  CARDS_REMOTE_URL?: string;
  BOOKS_REMOTE_URL?: string;
  VOCABULARY_REMOTE_URL?: string;
}

export default async (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };

  const CARDS_REMOTE_URL = env.CARDS_REMOTE_URL ?? "http://localhost:3001";
  const BOOKS_REMOTE_URL = env.BOOKS_REMOTE_URL ?? "http://localhost:3002";
  const VOCABULARY_REMOTE_URL = env.VOCABULARY_REMOTE_URL ?? "http://localhost:3003";

  const config: webpack.Configuration = await buildWebpackAsync({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        cards: `cards@${CARDS_REMOTE_URL}/remoteEntry.js`,
        books: `books@${BOOKS_REMOTE_URL}/remoteEntry.js`,
        vocabulary: `vocabulary@${VOCABULARY_REMOTE_URL}/remoteEntry.js`,
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true, 
          // requiredVersion: packageJson.dependencies["react"],
        },
        "react-router": {
          eager: true, 
          // requiredVersion: packageJson.dependencies["react-router"],
        },
        "react-router-dom": {
          eager: true, 
          // requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true, 
          // requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
