import { createWebpackConfig } from "haul";

export default {
  webpack: env => {
    console.log(env)
    const config = createWebpackConfig({
      entry: `./src/index.${env.platform}.tsx`,
    })(env);

    config.module.rules = [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      ...config.module.rules,
    ];

    config.resolve.extensions = [
      '.ts',
      '.tsx',
      `.${env.platform}.ts`,
      '.native.ts',
      `.${env.platform}.tsx`,
      '.native.tsx',
      ...config.resolve.extensions,
    ];

    return config;
  }
};

const config = createWebpackConfig({
  entry: `./src/index.${env.platform}.tsx`,
})(env);

module.exports = () => {
    const config = createWebpackConfig({
      entry: `./src/index.tsx`,
    })("android");

    config.module.rules = [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      ...config.module.rules,
    ];

    config.resolve.extensions = [
      '.ts',
      '.tsx',
      `.${env.platform}.ts`,
      '.native.ts',
      `.${env.platform}.tsx`,
      '.native.tsx',
      ...config.resolve.extensions,
    ];

    return config;
};
