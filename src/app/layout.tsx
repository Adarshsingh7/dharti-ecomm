import type { Metadata } from 'next';
import { Outfit, Outfit as Outfit_Mono } from 'next/font/google';
import './globals.css';

const outfitSans = Outfit({
	variable: '--font-outfit-sans',
	subsets: ['latin'],
});

const outfitMono = Outfit_Mono({
	variable: '--font-outfit-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Dharti Ecom',
	description: 'Buy genuine products from dharti ecom',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${outfitSans.variable} ${outfitMono.variable} font-sans h-full antialiased`}
		>
			<body className='min-h-full flex flex-col'>{children}</body>
		</html>
	);
}
