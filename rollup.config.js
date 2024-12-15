import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import html from "@rollup/plugin-html";

export default {
  input: "src/app.js", // Giriş dosyası (projenin ana dosyası)
  output: {
    file: "dist/bundle.js", // Çıkış dosyası
    format: "es", // ES module formatında çıktıyı sağlar
    sourcemap: true,
    publicPath: '/',
  },
  plugins: [
    resolve(), // Node modüllerini çözümler
    commonjs(), // CommonJS modüllerini ES modüllerine dönüştürür
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    terser(), // Kodun minify edilmesini sağlar
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      extensions: [".js", ".html"],
    }),
    html({
      include: "**/*.html",
    }),
  ],
};
