import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
// import { useCallback, useEffect, useState } from "react";
import { Image } from "~/components/molecules/responsive-image";
// import { useBreakpointValue } from "~/hooks/use-breakpoint-value";
// import useWindowSize from "~/hooks/use-window-size";
import { fetchAIArtGallery } from "~/lib/sanity";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params as { slug: string };
  const gallery = await fetchAIArtGallery({ slug });
  return json({ gallery });
}

export default function AIArtGalleryPage() {
  const { gallery } = useLoaderData();

  // const size = useWindowSize();
  // const columns = useBreakpointValue<number>({
  //   sm: 1,
  //   md: 3,
  //   lg: 4,
  //   xl: 5,
  //   "2xl": 6,
  // });

  // const [images, setImages] = useState([]);

  // const recalulateMasonryOrder = useCallback(() => {
  //   if (!columns) return;
  //   const masonryMatrix: any = Array.from(Array(columns)).map(() => []);
  //   console.log("masonryMatrix", masonryMatrix);
  //   gallery.aiArtImage.forEach((img, i: number) => {
  //     const row = Math.floor(i / columns);
  //     console.log("row", row);
  //     const column = i - columns * row;
  //     console.log("column", column);
  //     console.log("img", img.prompt);
  //     masonryMatrix[column].push(img);
  //   });
  //   setImages(masonryMatrix.flat());
  // }, [columns, gallery.aiArtImage]);

  // useEffect(() => {
  //   recalulateMasonryOrder();
  // }, [size.width, columns, recalulateMasonryOrder]);

  // console.log("images", images);

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="columns-1 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 3xl:columns-7 gap-4">
        {gallery.aiArtImage.map((aiArtImage: any) => (
          <Image
            className="block mb-4"
            imgClassName="rounded-xl"
            key={aiArtImage._key}
            alt={aiArtImage.image.alt}
            srcSets={[
              {
                height: parseInt(aiArtImage.height) / 2,
                width: parseInt(aiArtImage.width) / 2,
                media: "(min-width: 0px)",
                src: aiArtImage.image,
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
