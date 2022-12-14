import type { LinkDescriptor } from "@remix-run/cloudflare";
import { useMatches } from "@remix-run/react";

export function DynamicLinks() {
  let links: LinkDescriptor[] = useMatches().flatMap((match) => {
    let fn = match.handle?.dynamicLinks;
    if (typeof fn !== "function") return [];
    return fn({ data: match.data });
  });

  return (
    <>
      {links.map((link) => (
        <link {...link} key={link.integrity || JSON.stringify(link)} />
      ))}
    </>
  );
}
