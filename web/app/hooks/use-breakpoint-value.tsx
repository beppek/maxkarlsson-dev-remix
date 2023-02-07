import useWindowSize from "./use-window-size";

type BreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const screens = {
  sm: 512,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function getBreakPoint(width: number) {
  if (width > screens["2xl"]) return "2xl";
  if (width > screens.xl) return "xl";
  if (width > screens.lg) return "lg";
  if (width > screens.md) return "md";
  return "sm";
}

export function useBreakpointValue<T = any>(
  values: Partial<Record<BreakpointKey, T>>
) {
  const { width } = useWindowSize();
  if (!width) return;
  const breakpoint = getBreakPoint(width);

  const getClosestValue = () => {
    if (values[breakpoint]) return values[breakpoint];
    return values.base;
    // TODO: deal with smaller/larger breakpoints than defined in values
  };

  return getClosestValue();
}
