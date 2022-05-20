import { TopBar } from '../organisms/top-bar';

export function Layout({ children }) {
  return (
    <div className="bg-slate-400 h-screen">
      <TopBar />
      {children}
    </div>
  );
}
