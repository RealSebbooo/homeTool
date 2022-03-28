type Colors = {
  white: string;
  background: string;
  primary: string;
  surface: string;
};

type BreakpointWidths  = {
  xl: number,
  lg: number,
  md: number,
  sm: number,
  xs: number,
}

const theme: Colors = {
  white: "#ffffff",
  surface: "#585858",
  background: "#141414",
  primary: "#0183b7",
};

export const breakpoints: BreakpointWidths = {

  xl: 1920,
  lg: 1280,
  md: 960,
  sm: 600,
  xs: 360,
}

export default theme;
