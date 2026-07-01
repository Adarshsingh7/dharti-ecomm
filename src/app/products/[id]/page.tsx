import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id } = await params;
  
  let productDoc;
  try {
    productDoc = await Product.findById(id);
  } catch (e) {
    return notFound();
  }
  
  if (!productDoc) {
    return notFound();
  }
  
  const product = JSON.parse(JSON.stringify(productDoc));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
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
            <Link href="/products" className="text-sm font-medium hover:text-blue-600 transition-colors">Products</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">Contact</Link>
          </nav>
          <div className="md:hidden flex items-center">
            <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Carousel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
            {product.images && product.images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((img: string, idx: number) => {
                    const isVideo = /\.(mp4|webm|ogg)$/i.test(img);
                    return (
                      <CarouselItem key={idx}>
                        <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                          {isVideo ? (
                            <video src={img} controls className="object-cover w-full h-full" />
                          ) : (
                            <img src={img} alt={`${product.name} - Image ${idx + 1}`} className="object-cover w-full h-full" />
                          )}
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                {product.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-8">
            <div>
              <Link href="/products" className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline mb-4 inline-block">
                ← Back to Products
              </Link>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{product.name}</h1>
              <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                ₹{product.price}
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert prose-slate">
              <h3 className="text-xl font-bold mb-2">Description</h3>
              <p className="whitespace-pre-line text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <CheckoutModal productId={product._id} productName={product.name} price={product.price} />
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 flex items-start gap-4">
              <div className="text-2xl">🛡️</div>
              <div>
                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Authentic Dhatri Product</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">Distributed securely by Amba Agency. Quality guaranteed.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
