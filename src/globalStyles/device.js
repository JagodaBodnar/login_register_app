const size = {
  mobile: "576px",
  tablet: "768px",
  laptop: "992px",
  desktop: "1200px",
};
export const device = {
  mobileS: `(max-width: ${size.mobile})`,
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};
