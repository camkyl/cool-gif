// Common JS
// const terser = require("rollup-plugin-terser");

// ES6
import browsersync from "rollup-plugin-browsersync";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import postcssNormalize from "postcss-normalize";
import autoprefixer from "autoprefixer";
import babel from "rollup-plugin-babel";

// --environment NODE_ENV:production (package.json)
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = isProduction === false;

export default {
  input: "src/scripts/index.js",
  output: {
    file: "public/giphy.js",
    format: "iife"
  },
  plugins: [
    isDevelopment && browsersync({ server: "public" }),
    isProduction && terser(),
    postcss({
      extract: true,
      plugins: [
        postcssNormalize(/* pluginOptions */),
        autoprefixer(),
        cssnano(),
        babel(),
        resolve(),
        commonjs(),
        filesize()
      ],
      sourceMap: isDevelopment
    })
  ]
};
