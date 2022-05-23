import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => ({
  title: 'Home | Max Karlsson',
});

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Max Karlsson</h1>
    </div>
  );
}
