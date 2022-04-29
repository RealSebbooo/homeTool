export type UserObjectType = {
  email: string;
  password: string;
};
export type UserType = {
  email: string;
  name: string;
  uid: string;
};
export type ArticelType = {
  name: string;
  category: string;
  unit: string;
  icon: string;
  uid?: string;
  added: Date;
  amount?: string;
  amountUnit?: string;
};

export type ShoppingListType = {
  owner: string;
  members: string[];
  activeArticles: ArticelType[];
  recentArticles: recentArticle[];
  uid: string;
  name: string;
};

export type RecipesType = {
  name: string;
  image: string;
  description: string;
  owner: string;
  members: string[];
  ingredients: [
    {
      article: ArticelType;
      amount: number;
      amountUnit: string;
    }
  ];
};
type WeekplanDayType = {
  date: Date;
  recipes: RecipesType[];
};
export type WeekplanType = {
  owner: string;
  members: string[];
  name: string;
  days: WeekplanDayType[];
};

export interface recentArticle extends ArticelType {
  lastUsed: Date;
}
