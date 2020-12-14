require("dotenv").config();
const nodeExternals = require("webpack-node-externals");

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
};
