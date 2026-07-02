import Link from 'next/link';
import { Button } from '@/components/ui/button';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  await connectToDatabase();
  const productsDocs = await Product.find({ isActive: { $ne: false } }).sort({ isFuture: 1, createdAt: -1 });
  const products = JSON.parse(JSON.stringify(productsDocs));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Dharti Products Logo" className="h-10 w-auto rounded-md shadow-sm" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 hidden sm:inline-block">
              DHARTI PRODUCTS
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium text-green-600 transition-colors">Products</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">Contact</Link>
          </nav>
          <div className="md:hidden flex items-center">
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
          </div>
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
                     /\.(mp4|webm|ogg)$/i.test(product.images[0]) ? (
                       <video src={product.images[0]} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" muted loop autoPlay playsInline />
                     ) : (
                       <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                     )
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                   )}
                   {product.isFuture && (
                     <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow border border-yellow-300">
                       Coming Soon
                     </div>
                   )}
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                   <h3 className="font-bold text-xl mb-2 group-hover:text-green-600 transition-colors line-clamp-1">{product.name}</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                   <div className="mt-auto flex items-center justify-between">
                     <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">₹{product.price}</span>
                     <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                       <ChevronRight className="w-5 h-5" />
                     </div>
                   </div>
                 </div>
               </Link>
             ))
           )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
