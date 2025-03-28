export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cva", "cn"],
  overrides: [
    {
      files: ["*.tsx", "*.jsx", "*.ts", "*.js"],
      options: {
        semi: false,
        singleQuote: true,
      },
    },
  ],
};
