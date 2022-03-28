export type Colors = {
  white: string;
  background: string;
  primary: string;
  surface: string;
};

export enum Breakpoints {
  XL = 1920,
  LG = 1280,
  MD = 960,
  SM = 600,
  XS = 360,
}

const theme: Colors = {
  white: "#ffffff",
  surface: "#585858",
  background: "#141414",
  primary: "#0183b7",
};

export default theme;
