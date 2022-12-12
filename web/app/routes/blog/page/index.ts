import { redirect } from "@remix-run/cloudflare";

export async function loader() {
  return redirect("/blog", 308);
}
