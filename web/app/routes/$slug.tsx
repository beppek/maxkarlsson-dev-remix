import { fetchPage } from '~/lib/sanity';

export async function loader({ params }) {
  const { slug } = params;
  console.log('slug :>> ', slug);
  const page = await fetchPage({ slug });
  console.log('page :>> ', page);
  return {
    page,
  };
}

export default function CatchAll() {
  return <div>page</div>;
}
