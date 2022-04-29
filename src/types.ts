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
type ListType = {
  owner: string;
  members: string[];
  uid: string;
  name: string;
  listType: string;
};
export interface ShoppingListType extends ListType {
  activeArticles: ArticelType[];
  recentArticles: recentArticle[];
}

export interface RecipesType extends ListType {
  image: string;
  description: string;
  ingredients: [
    {
      article: ArticelType;
      amount: number;
      amountUnit: string;
    }
  ];
}
type WeekplanDayType = {
  date: Date;
  recipes: RecipesType[];
};
export interface WeekplanType extends ListType {
  days: WeekplanDayType[];
}

export interface recentArticle extends ArticelType {
  lastUsed: Date;
}
