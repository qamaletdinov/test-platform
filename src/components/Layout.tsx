import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
            Тесты
          </Link>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Главная</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
