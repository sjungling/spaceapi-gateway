require("dotenv").config();
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack"); // to access built-in plugins

module.exports = {
  externals: [nodeExternals()],
  optimization: { minimize: false },
  mode: "development",
  node: {
    global: false,
    __filename: false,
    __dirname: true,
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],
};
