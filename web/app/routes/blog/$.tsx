import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

export async function loader({ params }: LoaderArgs) {
  const path = params["*"];
  if (!path) {
    return redirect("/blog", 307);
  }
  const parts = path.split("/");
  if (parts.length !== 3) {
    throw new Response("Not Found", { status: 404 });
  }
  const yearRegex = /^\d{4}$/;
  const monthRegex = /^\d{2}$/;
  if (!yearRegex.test(parts[0]) || !monthRegex.test(parts[1])) {
    throw new Response("Not Found", { status: 404 });
  }
  const slug = parts[parts.length - 1];
  return redirect(`/blog/${slug}`, 301);
}

export function CatchBoundary() {
  return (
    <main className="px-4 lg:px-8 py-2 lg:py-20 w-full">
      <div className="flex justify-center content-center">
        <div className="text-black dark:text-white">
          <div className="w-full lg:max-w-4xl">
            <h2 className="font-heading text-2xl">
              Hey mate, looks like you got lost!
            </h2>
            <p className="mt-4">
              This page is out in woop woop, try something else.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function () {
  return <></>;
}
