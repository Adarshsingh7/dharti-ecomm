import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';
import { CheckCircle2, ChevronRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import AnimatedStats from '@/components/AnimatedStats';

export const dynamic = 'force-dynamic';

const promiseItems = [
	{
		title: 'Quality',
		description:
			'We focus on dependable products that meet everyday household needs with consistent quality.',
	},
	{
		title: 'Sustainability',
		description:
			'We support responsible choices by promoting practical products and mindful business practices.',
	},
	{
		title: 'Innovation',
		description:
			'We keep improving our product selection and service to match changing customer expectations.',
	},
	{
		title: 'Customer Focus',
		description:
			'We listen carefully, respond quickly, and keep customer satisfaction at the center of our work.',
	},
	{
		title: 'Integrity',
		description:
			'We work with honesty, transparency, and respect for our customers, partners, and community.',
	},
	{
		title: 'Community Engagement',
		description:
			'We value local relationships and aim to grow while making a positive difference around us.',
	},
];

const businessStats = [
	{ value: '10+', label: 'Years of Dhatri' },
	{ value: '100+', label: 'Distributors' },
	{ value: '1000+', label: 'Retailers' },
	{ value: '10000+', label: 'Households' },
];

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
					className='w-full py-16 md:py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800'
				>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='mb-14 rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 px-5 py-5 text-center shadow-xl shadow-green-900/10 dark:shadow-black/20'>
							<p className='text-sm md:text-lg font-bold uppercase tracking-wide text-white'>
								Welcome to dependable household essentials with Dhatri Products
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] items-start gap-10 lg:gap-14'>
							<div className='space-y-8'>
								<div className='space-y-5'>
									<p className='inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold uppercase tracking-wider text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-300'>
										<Sparkles className='h-4 w-4' />
										About Dhatri Products
									</p>
									<h2 className='max-w-xl text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl lg:text-6xl'>
										10+ Years of{' '}
										<span className='text-green-600 dark:text-green-400'>
											Trusted Service
										</span>{' '}
										for Indian Homes
									</h2>
								</div>

								<div className='relative mx-auto w-full max-w-[260px] overflow-hidden rounded-3xl border-[6px] border-white bg-slate-100 shadow-2xl shadow-slate-900/15 ring-4 ring-green-100 dark:border-slate-800 dark:bg-slate-800 dark:ring-green-900/40 lg:mx-0'>
									<div className='relative aspect-[4/5]'>
										<Image
											src='/founder.jpg'
											alt='Founder Prince Baranwal'
											fill
											sizes='(max-width: 1024px) 260px, 24vw'
											className='object-cover'
										/>
									</div>
									<div className='bg-white px-6 py-4 text-center dark:bg-slate-800'>
										<p className='text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400'>
											Founder
										</p>
										<h3 className='mt-1 text-xl font-bold text-slate-900 dark:text-slate-100'>
											Prince Baranwal
										</h3>
									</div>
								</div>
							</div>

							<div className='space-y-7 pt-1 lg:pt-12'>
								<div className='space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg'>
									<p>
										Dhatri Products is a premier marketing and distribution company
										focused on bringing high-quality, authentic household products
										directly to families with dependable service and honest support.
									</p>
									<p>
										Through Amba Agency in Basti, we connect customers with carefully
										selected products that balance everyday usefulness, value, and
										trust. Our work is guided by quality, consistency, and long-term
										customer relationships.
									</p>
								</div>

								<div className='grid gap-3'>
									<div className='flex gap-4 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-900/20'>
										<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-green-600 shadow-sm dark:bg-slate-900 dark:text-green-400'>
											<MapPin className='h-5 w-5' />
										</div>
										<div className='font-medium leading-relaxed text-slate-700 dark:text-slate-300'>
											<p className='font-bold text-slate-900 dark:text-slate-100'>
												<strong>Marketed By: </strong>Amba Agency
											</p>
											<p className='font-bold text-slate-900 dark:text-slate-100'>
												Shop Address:
											</p>
											<p>Dakhin Darwaza Station Road, Basti</p>
											<p>Pin Code: 272002, Uttar Pradesh</p>
										</div>
									</div>
									<div className='grid gap-3 sm:grid-cols-2'>
										<div className='flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'>
												<Mail className='h-5 w-5' />
											</div>
											<span className='min-w-0 break-words font-medium text-slate-700 dark:text-slate-300'>
												ambaagency272002@gmail.com
											</span>
										</div>
										<div className='flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'>
												<Phone className='h-5 w-5' />
											</div>
											<span className='font-medium text-slate-700 dark:text-slate-300'>
												+91 8840 63 4256
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2'>
							<div className='rounded-2xl bg-gradient-to-br from-green-700 via-emerald-600 to-green-500 p-7 text-center text-white shadow-xl shadow-green-900/15 md:p-10'>
								<div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25'>
									<CheckCircle2 className='h-6 w-6' />
								</div>
								<h3 className='text-2xl font-black uppercase tracking-wide'>
									Our Vision
								</h3>
								<p className='mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-green-50 md:text-lg'>
									To become a trusted name for household products by combining
									reliable quality, responsible choices, and service that keeps
									families confident in every purchase.
								</p>
							</div>
							<div className='rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-green-700 p-7 text-center text-white shadow-xl shadow-green-900/15 md:p-10'>
								<div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25'>
									<CheckCircle2 className='h-6 w-6' />
								</div>
								<h3 className='text-2xl font-black uppercase tracking-wide'>
									Our Mission
								</h3>
								<p className='mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-green-50 md:text-lg'>
									To deliver useful, affordable, and authentic products through a
									customer-first experience built on transparency, consistency, and
									long-term local relationships.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Promise Section */}
				<section className='w-full bg-slate-50 py-16 dark:bg-slate-950'>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='mb-12 rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 px-5 py-5 text-center shadow-xl shadow-green-900/10'>
							<h2 className='text-xl font-black uppercase tracking-wide text-white md:text-2xl'>
								The Dhatri Promise
							</h2>
						</div>

						<div className='grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2'>
							{promiseItems.map((item) => (
								<div key={item.title} className='flex gap-4'>
									<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-600/20'>
										<CheckCircle2 className='h-6 w-6' />
									</div>
									<div>
										<h3 className='text-2xl font-black uppercase tracking-wide text-green-700 dark:text-green-400'>
											{item.title}
										</h3>
										<p className='mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg'>
											{item.description}
										</p>
									</div>
								</div>
							))}
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

				
				{/* Business Stats Section */}
				<AnimatedStats stats={businessStats} />

				{/* Product Clips Section */}
				<section className='w-full py-20 bg-white dark:bg-slate-900'>
					<div className='container mx-auto px-4 md:px-6'>
						<div className='mx-auto max-w-3xl text-center mb-12'>
							<p className='text-sm font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3'>
								Product Highlights
							</p>
							<h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4'>
								See Dhatri Products in Action
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
