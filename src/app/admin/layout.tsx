import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-950 border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
          Amba Admin Panel
        </div>
        <nav className="flex gap-4">
          <Link href="/admin" className="text-sm font-medium hover:text-blue-600">
            Orders
          </Link>
          <Link href="/admin/products" className="text-sm font-medium hover:text-blue-600">
            Products
          </Link>
          <Link href="/admin/products/new" className="text-sm font-medium hover:text-blue-600">
            Add Product
          </Link>
          <Link href="/admin/contacts" className="text-sm font-medium hover:text-blue-600">
            Messages
          </Link>
          <Link href="/admin/settings" className="text-sm font-medium hover:text-blue-600">
            Settings
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900">
            View Store
          </Link>
        </nav>
      </header>
      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
