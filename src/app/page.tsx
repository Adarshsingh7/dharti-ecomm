import Link from 'next/link';
import { Button } from '@/components/ui/button';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';
import { CheckCircle2, ChevronRight, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';

export const dynamic = 'force-dynamic';

export default async function Home() {
	await connectToDatabase();
	const productsDocs = await Product.find({ isActive: { $ne: false } })
		.sort({ isFuture: 1, createdAt: -1 })
		.limit(4);
	const products = JSON.parse(JSON.stringify(productsDocs));

	return (
		<div className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50'>
			{/* Navbar */}
			<header className='sticky top-0 z-50 w-full border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl'>
				<div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
					<Link
						href='/'
						className='flex items-center gap-3'
					>
						<img
							src='/logo.jpeg'
							alt='Amba Agency Logo'
							className='h-10 w-auto rounded-md shadow-sm'
						/>
						{/* <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 hidden sm:inline-block">
              AMBA AGENCY
            </span> */}
					</Link>
					<nav className='hidden md:flex gap-6'>
						<Link
							href='#portfolio'
							className='text-sm font-medium hover:text-green-600 transition-colors'
						>
							Portfolio
						</Link>
						<Link
							href='#products'
							className='text-sm font-medium hover:text-green-600 transition-colors'
						>
							Products
						</Link>
						<Link
							href='/contact'
							className='text-sm font-medium hover:text-green-600 transition-colors'
						>
							Contact
						</Link>
					</nav>
					<div className='flex items-center gap-3 md:gap-4'>
						<Link href='/contact' className='md:hidden text-sm font-medium hover:text-green-600 transition-colors'>
							Contact
						</Link>
						<Link href='#products'>
							<Button className='rounded-full shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'>
								Shop Now
							</Button>
						</Link>
					</div>
				</div>
			</header>

			<main className='flex-1'>
				{/* Hero Section */}
				<HeroSlider />

				{/* Portfolio / Info Section */}
				<section
					id='portfolio'
					className='w-full py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800'
				>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='flex flex-col md:flex-row items-center gap-12'>
							<div className='flex-1 space-y-6'>
								<h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4'>
									About Dharti Products
								</h2>
								<p className='text-slate-600 dark:text-slate-400 text-lg leading-relaxed'>
									Dharti Products is a premier marketing and distribution company
									specializing in delivering high-quality, authentic products directly
									to consumers.
								</p>
								<div className='pt-4 flex flex-col gap-3'>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400'>
											📧
										</div>
										<span className='font-medium text-slate-700 dark:text-slate-300'>
											ambaagency272002@gmail.com
										</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400'>
											📞
										</div>
										<span className='font-medium text-slate-700 dark:text-slate-300'>
											+91 8840 63 4256
										</span>
									</div>
								</div>
							</div>
							<div className='flex-1 flex flex-col items-center'>
								<div className='relative h-[400px] w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white dark:border-slate-800 ring-4 ring-green-100 dark:ring-green-900 mb-6'>
									<img src='/founder.jpg' alt='Founder Prince Barnawal' className='w-full h-full object-cover' />
								</div>
								<div className='text-center bg-white dark:bg-slate-800 px-8 py-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-700'>
									<p className='text-sm text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mb-1'>Founder</p>
									<h3 className='text-xl font-bold text-slate-800 dark:text-slate-200'>Prince Barnawal</h3>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Products Preview Section */}
				<section
					id='products'
					className='w-full py-24 bg-slate-50 dark:bg-slate-950'
				>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='flex items-end justify-between mb-12'>
							<div>
								<h2 className='text-3xl md:text-4xl font-bold mb-4'>
									Our Products
								</h2>
								<p className='text-slate-600 dark:text-slate-400 max-w-2xl'>
									Browse through our exclusive selection of Dhatri products,
									carefully selected for maximum quality.
								</p>
							</div>
							<Link href='/products'>
								<Button
									variant='outline'
									className='hidden sm:flex group rounded-full border-blue-200 hover:border-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20'
								>
									See All Products
									<span className='ml-2 group-hover:translate-x-1 transition-transform'>
										→
									</span>
								</Button>
							</Link>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
							{products.length === 0 ? (
								<div className='col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl'>
									<p className='text-slate-500 mb-4'>
										No products available yet.
									</p>
								</div>
							) : (
								products.map((product: any) => (
									<Link
										href={`/products/${product._id}`}
										key={product._id}
										className='group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
									>
										<div className='relative aspect-square w-full bg-slate-100 dark:bg-slate-800 overflow-hidden'>
											{product.images && product.images.length > 0 ? (
                        /\.(mp4|webm|ogg)$/i.test(product.images[0]) ? (
                          <video
                            src={product.images[0]}
                            className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                            muted
                            loop
                            autoPlay
                            playsInline
                          />
                        ) : (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                          />
                        )
											) : (
												<div className='w-full h-full flex items-center justify-center text-slate-400'>
													No Image
												</div>
											)}
                      {product.isFuture && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                          Coming Soon
                        </div>
                      )}
										</div>
										<div className='p-6 flex-1 flex flex-col'>
											<h3 className='font-bold text-xl mb-2 group-hover:text-green-600 transition-colors line-clamp-1'>
												{product.name}
											</h3>
											<p className='text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2'>
												{product.description}
											</p>
											<div className='mt-auto flex items-center justify-between'>
												<span className='font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600'>
													₹{product.price}
												</span>
												<div className='w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors'>
													<ChevronRight className='w-4 h-4' />
												</div>
											</div>
										</div>
									</Link>
								))
							)}
						</div>

						<div className='text-center mt-12'>
							<Link href='/products'>
								<Button
									variant='outline'
									size='lg'
									className='rounded-full px-8 hover:bg-slate-100 dark:hover:bg-slate-800'
								>
									View All Products
								</Button>
							</Link>
						</div>
					</div>
				</section>

				{/* Product Clips Section */}
				<section className='w-full py-20 bg-white dark:bg-slate-900'>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='mx-auto max-w-3xl text-center mb-12'>
							<p className='text-sm font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3'>
								Product Highlights
							</p>
							<h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4'>
								See Dharti Products in Action
							</h2>
							<p className='text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed'>
								Watch a closer look at our products and presentation before you
								place your order.
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
							{[
								{ src: '/clips/clip1.mp4', title: 'Product Presentation Clip 1' },
								{ src: '/clips/clip2.mp4', title: 'Product Presentation Clip 2' },
							].map((clip) => (
								<video
									key={clip.src}
									src={clip.src}
									title={clip.title}
									controls
									playsInline
									preload='metadata'
									aria-label={clip.title}
									className='aspect-video w-full rounded-3xl object-cover shadow-2xl shadow-slate-900/10 dark:shadow-black/30'
								/>
							))}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
