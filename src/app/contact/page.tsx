"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Dhatri Products Logo" className="h-10 w-auto rounded-md shadow-sm" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 hidden sm:inline-block">
              DHATRI PRODUCTS
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium hover:text-green-600 transition-colors">Products</Link>
            <Link href="/contact" className="text-sm font-medium text-green-600 transition-colors">Contact</Link>
          </nav>
          <div className="md:hidden flex items-center">
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12 lg:py-24 flex justify-center">
        <div className="w-full max-w-lg">
          <Card className="shadow-2xl border-slate-200 dark:border-slate-800">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-extrabold tracking-tight">Contact Us</CardTitle>
              <CardDescription className="text-base mt-2">
                Need a contract or have questions? Fill out the form below and we'll get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="py-8 text-center space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-8 rounded-2xl text-center shadow-inner border border-green-100 dark:border-green-800">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                    <p className="text-slate-500">Thank you for reaching out to Dhatri Products. We will review your inquiry shortly.</p>
                  </div>
                  <Button onClick={() => setSuccess(false)} variant="outline" className="mt-6">Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message / Contract Request</Label>
                    <Textarea id="message" name="message" required placeholder="Tell us what you need..." className="min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
