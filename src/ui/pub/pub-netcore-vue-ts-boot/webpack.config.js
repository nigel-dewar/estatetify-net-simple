const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const devMode = isDevBuild ? 'development':'production';

    return [{
        mode: devMode,
        stats: { modules: false },
        context: __dirname,
        // devtool: "source-map",
        resolve: {
            extensions: ['.ts', 'tsx', '.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        entry: {
            polyfill: '@babel/polyfill',
            main: ['./ClientApp/main.ts']
            // main: ['./ClientApp/boot.js']
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    include: /ClientApp/,
                    options: {
                      loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                      }
                      // other vue-loader options go here
                    }
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                },
            { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) },
            {
                test: /\.scss$/,
                use: [
                    isDevBuild ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDevBuild } },
                    { loader: 'sass-loader', options: { sourceMap: isDevBuild } }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    isDevBuild ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDevBuild } },
                    { loader: 'sass-loader', options: { sourceMap: isDevBuild } }
                ]
            },
                {
                  test: /\.(png|jpg|gif|svg)$/,
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]?[hash]'
                  }
                },
                {
                  test: /\.(woff|woff2|eot|ttf|otf)$/,
                  loader: 'file-loader'
                }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
            // sourceMapFilename: "[name].js.map"
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
             //new webpack.DllReferencePlugin({
             //    context: __dirname,
             //    manifest: require('./dist/vendor-manifest.json')
             //}),
            
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new UglifyJsPlugin(),
            new ExtractTextPlugin('site.css')
            
        ])
    }];
};
