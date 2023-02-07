import { useEffect, useState } from "react";
import { useEventListener } from "~/hooks/use-event-listener";

interface WindowSize {
  height?: number;
  width?: number;
}

export default function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({
    height: undefined,
    width: undefined,
  });

  const handleResize = () => {
    setSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useEventListener("resize", handleResize);

  useEffect(() => {
    handleResize();
  }, []);

  return size;
}
