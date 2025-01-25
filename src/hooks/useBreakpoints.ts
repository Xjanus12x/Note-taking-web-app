import { useMediaQuery } from "react-responsive";

const breakpoints = new Map([
  ["mobile", "(max-width: 767px)"],
  ["tablet", "(min-width: 768px) and (max-width: 1024px)"],
  ["desktop", "(min-width: 1100px)"],
]);

export const useBreakpoints = () => {
  const isMobile = useMediaQuery({ query: breakpoints.get("mobile") });
  const isTablet = useMediaQuery({ query: breakpoints.get("tablet") });
  const isDesktop = useMediaQuery({ query: breakpoints.get("desktop") });

  return { isMobile, isTablet, isDesktop };
};
