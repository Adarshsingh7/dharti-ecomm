import Link from 'next/link';
import { Button } from '@/components/ui/button';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';

export default async function Home() {
	await connectToDatabase();
	const productsDocs = await Product.find({ isActive: { $ne: false } })
		.sort({ createdAt: -1 })
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
							className='text-sm font-medium hover:text-blue-600 transition-colors'
						>
							Portfolio
						</Link>
						<Link
							href='#products'
							className='text-sm font-medium hover:text-blue-600 transition-colors'
						>
							Products
						</Link>
						<Link
							href='/contact'
							className='text-sm font-medium hover:text-blue-600 transition-colors'
						>
							Contact
						</Link>
					</nav>
					<div className='flex items-center gap-4'>
						<Link href='#products'>
							<Button className='rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
								Shop Now
							</Button>
						</Link>
					</div>
				</div>
			</header>

			<main className='flex-1'>
				{/* Hero Section */}
				<section className='relative w-full py-24 md:py-32 lg:py-48 overflow-hidden'>
					<div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-slate-950 dark:to-slate-950'></div>
					<div className='container mx-auto px-4 md:px-6 text-center'>
						<div className='inline-block animate-bounce rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm text-blue-600 dark:text-blue-300 font-medium mb-6'>
							Welcome to Amba Agency
						</div>
						<h1 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-6'>
							Discover the Magic of <br />
							<span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400'>
								Dhatri Products
							</span>
						</h1>
						<p className='mx-auto max-w-[700px] text-lg text-slate-600 dark:text-slate-400 mb-10'>
							Premium quality, authentic Dhatri products curated just for you.
							Explore our collection and experience the difference today.
						</p>
						<div className='flex justify-center gap-4'>
							<Link href='#products'>
								<Button
									size='lg'
									className='rounded-full px-8 shadow-xl shadow-blue-500/20 hover:scale-105 transition-all bg-gradient-to-r from-blue-600 to-indigo-600'
								>
									Explore Products
								</Button>
							</Link>
						</div>
					</div>
				</section>

				{/* Portfolio / Info Section */}
				<section
					id='portfolio'
					className='w-full py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800'
				>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='flex flex-col md:flex-row items-center gap-12'>
							<div className='flex-1 space-y-6'>
								<h2 className='text-3xl md:text-4xl font-bold'>
									About Amba Agency
								</h2>
								<div className='h-1 w-20 bg-blue-600 rounded'></div>
								<p className='text-slate-600 dark:text-slate-400 text-lg leading-relaxed'>
									Amba Agency is a premier marketing and distribution company
									specializing in Dhatri products. We bridge the gap between
									quality manufacturing and consumer needs, ensuring that you
									receive only the most authentic and effective products.
								</p>
								<div className='pt-4 flex flex-col gap-3'>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400'>
											📧
										</div>
										<span className='font-medium text-slate-700 dark:text-slate-300'>
											ambaagency272002@gmail.com
										</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400'>
											📞
										</div>
										<span className='font-medium text-slate-700 dark:text-slate-300'>
											+91 8840 63 4256
										</span>
									</div>
								</div>
							</div>
							<div className='flex-1'>
								<div className='relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center'>
									{/* Placeholder for dynamic image/brand identity */}
									<div className='text-white text-center'>
										<h3 className='text-5xl font-black mb-4'>AMBA</h3>
										<p className='text-blue-100 text-xl tracking-widest uppercase'>
											Marketing Agency
										</p>
									</div>
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
												<img
													src={product.images[0]}
													alt={product.name}
													className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
												/>
											) : (
												<div className='w-full h-full flex items-center justify-center text-slate-400'>
													No Image
												</div>
											)}
										</div>
										<div className='p-5 flex-1 flex flex-col'>
											<h3 className='font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1'>
												{product.name}
											</h3>
											<p className='text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2'>
												{product.description}
											</p>
											<div className='mt-auto flex items-center justify-between'>
												<span className='font-bold text-lg'>
													₹{product.price}
												</span>
												<Button
													variant='secondary'
													size='sm'
													className='rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50'
												>
													View Details
												</Button>
											</div>
										</div>
									</Link>
								))
							)}
						</div>

						<div className='mt-8 sm:hidden'>
							<Link
								href='/products'
								className='w-full'
							>
								<Button
									variant='outline'
									className='w-full rounded-full'
								>
									See All Products
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className='w-full py-8 bg-slate-900 text-slate-400 text-center'>
				<p>© {new Date().getFullYear()} Amba Agency. All rights reserved.</p>
			</footer>
		</div>
	);
}
