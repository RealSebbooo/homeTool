module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        exclude: /(node_modules|.cache|public)/,
        stages: ["develop"],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
};
