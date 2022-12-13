import { fetchAllBlogPosts } from "~/lib/sanity";

export async function loader() {
  const allPosts = await fetchAllBlogPosts();

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://maxkarlsson.dev/</loc>
        <lastmod>2022-12-13T00:15:16+11:00</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://maxkarlsson.dev/blog</loc>
        <lastmod>2022-12-13T00:15:16+11:00</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://maxkarlsson.dev/about</loc>
        <lastmod>2022-12-13T00:15:16+11:00</lastmod>
        <priority>1.0</priority>
      </url>
      ${allPosts.map(
        (post) => `
        <url>
          <loc>https://maxkarlsson.dev/blog/${post.slug}</loc>
          <lastmod>${post._updatedAt}</lastmod>
          <priority>1.0</priority>
        </url>
      `
      )}
    </urlset>
    `;
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
}
