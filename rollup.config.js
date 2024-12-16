import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import html from "@rollup/plugin-html";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";

export default {
  input: "src/app.js",
  output: {
    file: "dist/bundle.js",
    format: "es",
    sourcemap: true,
    publicPath: "/",
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    terser(),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      extensions: [".js", ".html"],
    }),
    html({
      include: "**/*.html",
    }),
    copy({
      targets: [{ src: "index.html", dest: "dist" }],
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "src", "dist"],
      host: "0.0.0.0",
      port: 3001,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
  ],
};
