import { json } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { Image } from '~/components/molecules/responsive-image';
import { fetchAIArtGalleries } from '~/lib/sanity';

export async function loader() {
  const artGalleries = await fetchAIArtGalleries();
  return json({ artGalleries });
}

function ImageGalleryCard({ gallery, mainImage }) {
  return (
    <Link
      className={`
          relative 
          overflow-hidden 
          border-2 
          hover:scale-105 
          transition-all 
          border-green-400 
          rounded-xl 
          hover:bg-green-400/75 
          bg-white-alpha-70 
          dark:bg-black-alpha-70 
          hover:shadow-card
          hover:shadow-green-400
        `}
      to={`/ai-art/${gallery.slug.current}`}
    >
      <Image
        alt={gallery.title}
        srcSets={[
          {
            height: 200,
            width: 200,
            media: '(min-width: 0px)',
            src: gallery.aiArtImage[0].image,
          },
        ]}
      />
      <p className="absolute bottom-0 w-full bg-green-400/75 py-2 font-heading uppercase text-xs text-center">
        {gallery.title}
      </p>
    </Link>
  );
}

export default function AIArtPage() {
  const { artGalleries } = useLoaderData();
  return (
    <div className="text-black dark:text-white flex flex-col items-center justify-center h-[calc(100vh-142px)]">
      {artGalleries.map((gallery: any) => (
        <ImageGalleryCard
          mainImage={gallery.aiArtImage[0].image}
          key={gallery.slug.current}
          gallery={gallery}
        />
      ))}
    </div>
  );
}
