exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const Einkaufsliste = require.resolve("./src/packages/index.tsx");
  const Rezepte = require.resolve(
    "./src/packages/rezepte/template/rezepte.tsx"
  );
  const Recipe = require.resolve("./src/packages/rezepte/template/recipe.tsx");
  const Wochenplan = require.resolve("./src/packages/wochenplan.tsx");
  const Account = require.resolve(
    "./src/packages/account/template/account.tsx"
  );
  const Artikel = require.resolve("./src/packages/articles.tsx");
  const Login = require.resolve("./src/packages/login.tsx");
  const Register = require.resolve("./src/packages/register.tsx");

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
