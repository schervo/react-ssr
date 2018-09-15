// Dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Package.json
import pkg from '../../package.json';

export default type => {
  const rules = [
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env', {
                modules: false,
                node: pkg.engines.node,
                browsers: pkg.browserslist,
              },
            ],
          ],
        },
      },
      exclude: /node_modules/,
    },
  ];

  if (!isDevelopment || type === 'server') {
    rules.push({
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: require(path.join(process.cwd(), 'src/shared/styles/index.js')),
            },
          },
        ],
      }),
    });
  } else {
    rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: require(path.join(process.cwd(), 'src/shared/styles/index.js')),
          },
        },
      ],
    });
  }

  rules.push({
    test: /\.(jpe?g|png|gif|svg|ico)$/i,
    use: 'url-loader?limit=8192',
  });

  return rules;
};
