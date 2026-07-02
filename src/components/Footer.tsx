import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dhatriproduct?igsh=MWNvdXA4NHY1M2wwNA==",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    label: "X",
    href: "https://x.com",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 py-12 lg:py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Dhatri Products Logo" className="h-12 w-auto rounded-md shadow-sm" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                DHATRI PRODUCTS
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Premium quality products delivered right to your doorstep. We take pride in ensuring the best experience and customer satisfaction.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Dhatri Products on ${link.label}`}
                  className="min-h-10 rounded-full border border-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-green-500 hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-green-400 transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-green-400 transition-colors">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-500" />
                <span>+91 8840634256</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-500" />
                <span>ambaagency272002@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Amba Agency<br />
                  Dakhin Darwaza Station Road, Basti<br />
                  Pin Code: 272002, Uttar Pradesh
                </span>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col gap-2">
          <p>&copy; {new Date().getFullYear()} DHATRI PRODUCTS. All rights reserved.</p>
          <a target="_blank" href="https://www.stechwebsolution.com">
            <p>Made by <span className="font-semibold text-green-500">Stech Web Solution</span></p>
          </a>
        </div>
      </div>
    </footer>
  );
}
