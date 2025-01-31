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
}

export default async (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };

  const config: webpack.Configuration = await buildWebpackAsync({
    port: env.port ?? 3002,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "books",
      filename: "remoteEntry.js",
      exposes: {
        "./Router": "./src/app/router/Router.tsx",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true, 
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router": {
          eager: true, 
          requiredVersion: packageJson.dependencies["react-router"],
        },
        "react-router-dom": {
          eager: true, 
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
      
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
