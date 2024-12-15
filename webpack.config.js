const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production", // 'development' for dev builds
  entry: "./src/app.js", // Projenizin giriş noktası
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: "./dist",
    port: 3000, // Development server için kullanılacak port
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // CSS dosyaları için
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Modern JavaScript kodunu dönüştürmek için
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Önceki build dosyalarını temizler
    new HtmlWebpackPlugin({
      template: "./dev/index.html", // Şablon olarak kullanılacak HTML dosyası
    }),
  ],
};
