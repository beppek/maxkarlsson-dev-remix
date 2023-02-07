import { useEffect } from "react";

export function useEventListener<
  WindowEventKey extends keyof WindowEventMap,
  ElementEventKey extends keyof HTMLElementEventMap,
  DocumentEventKey extends keyof DocumentEventMap,
  Element extends HTMLElement | void = void
>(
  event: WindowEventKey | ElementEventKey | DocumentEventKey,
  callback: (
    event:
      | WindowEventMap[WindowEventKey]
      | HTMLElementEventMap[ElementEventKey]
      | DocumentEventMap[DocumentEventKey]
      | Event
  ) => void,
  element?: Element | "document"
) {
  useEffect(() => {
    const target: Element | Window | Document =
      element === "document" ? document : element ?? window;
    if (!target?.addEventListener) return;

    target.addEventListener(event, callback);
    return () => {
      target.removeEventListener(event, callback);
    };
  }, [event, callback, element]);
}
