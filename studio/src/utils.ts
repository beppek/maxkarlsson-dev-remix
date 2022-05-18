import sanityClient from 'part:@sanity/base/client';

export function getClient() {
  const client = sanityClient.withConfig({
    apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2021-03-25',
  });
  return client;
}
