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
const size = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}
export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`
};
export default theme;
