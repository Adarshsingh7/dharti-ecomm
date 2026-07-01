import Link from 'next/link';
import { Button } from '@/components/ui/button';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  await connectToDatabase();
  const productsDocs = await Product.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
  const products = JSON.parse(JSON.stringify(productsDocs));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Amba Agency Logo" className="h-10 w-auto rounded-md shadow-sm" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 hidden sm:inline-block">
              AMBA AGENCY
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium text-blue-600 transition-colors">Products</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">All Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {products.length === 0 ? (
             <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
               <p className="text-slate-500 mb-4 text-lg">No products available yet.</p>
             </div>
           ) : (
             products.map((product: any) => (
               <Link href={`/products/${product._id}`} key={product._id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                 <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                   {product.images && product.images.length > 0 ? (
                     <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                   )}
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                   <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                   <div className="mt-auto flex items-center justify-between">
                     <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">₹{product.price}</span>
                     <Button variant="default" size="sm" className="rounded-full shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-blue-600 to-indigo-600">Buy Now</Button>
                   </div>
                 </div>
               </Link>
             ))
           )}
        </div>
      </main>
    </div>
  );
}
