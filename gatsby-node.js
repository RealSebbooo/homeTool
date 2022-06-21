const path = require(`path`);

exports.createPages = ({ actions }) => {
  const Einkaufsliste = path.resolve("./src/packages/shoppingList.tsx");
  const Rezepte = path.resolve("./src/packages/rezepte.tsx");
  const Recipe = path.resolve("./src/packages/recipe.tsx");
  const Wochenplan = path.resolve("./src/packages/wochenplan.tsx");
  const Account = path.resolve("./src/packages/account.tsx");
  const Artikel = path.resolve("./src/packages/articles.tsx");
  const Login = path.resolve("./src/packages/login.tsx");
  const Register = path.resolve("./src/packages/register.tsx");
  const { createPage } = actions;

  createPage({
    path: "/",
    component: Einkaufsliste,
  });
  createPage({
    path: "/rezepte",
    component: Rezepte,
  });
  createPage({
    path: "/recipe",
    component: Recipe,
  });
  createPage({
    path: "/wochenplan",
    component: Wochenplan,
  });
  createPage({
    path: "/account",
    component: Account,
  });
  createPage({
    path: "/artikel",
    component: Artikel,
  });
  createPage({
    path: "/login",
    component: Login,
  });
  createPage({
    path: "/register",
    component: Register,
  });
};
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    return actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
