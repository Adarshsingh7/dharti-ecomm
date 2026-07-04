import { Phone } from 'lucide-react';

const phoneNumber = '918840634256';

function WhatsAppIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			aria-hidden='true'
			className='h-6 w-6'
			fill='currentColor'
		>
			<path d='M12.04 2C6.59 2 2.15 6.44 2.15 11.89c0 1.74.46 3.44 1.32 4.94L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.45 0 9.89-4.44 9.89-9.89C21.94 6.44 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.15.83.84-3.07-.2-.32a8.19 8.19 0 0 1-1.25-4.35c0-4.55 3.7-8.25 8.26-8.25 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.55-3.7 8.24-8.26 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.65.81-.79.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.68 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z' />
		</svg>
	);
}

export default function FloatingContactButtons() {
	return (
		<div className='fixed bottom-5 right-5 z-[100] flex flex-col gap-3'>
			<a
				href={`https://wa.me/${phoneNumber}`}
				target='_blank'
				rel='noopener noreferrer'
				aria-label='Chat on WhatsApp'
				className='flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-900/25 ring-1 ring-white/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300'
			>
				<WhatsAppIcon />
			</a>
			<a
				href={`tel:+${phoneNumber}`}
				aria-label='Call Amba Agency'
				className='flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl shadow-slate-900/25 ring-1 ring-white/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 dark:bg-white dark:text-slate-950'
			>
				<Phone className='h-6 w-6' />
			</a>
		</div>
	);
}
