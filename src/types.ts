export type UserObjectType = {
  email: string;
  password: string;
};
export type UserType = {
  email: string;
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
  owner?: string;
  members?: string[];
  activeArticles?: ArticelType[];
  recentArticles?: recentArticle[];
  uid: string;
};

export interface recentArticle extends ArticelType {
  lastUsed: Date;
}
