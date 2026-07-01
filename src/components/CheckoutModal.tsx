"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CheckoutModal({ productId, productName, price }: { productId: string, productName: string, price: number }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      productId,
      userName: formData.get("userName"),
      mobileNumber: formData.get("mobileNumber"),
      address: formData.get("address"),
      contact: formData.get("contact"),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* @ts-ignore */}
      <DialogTrigger asChild>
        <Button size="lg" className="w-full md:w-auto rounded-full px-12 shadow-xl shadow-green-500/20 hover:scale-105 transition-all bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg">
          Buy Now - ₹{price}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            You are ordering <strong>{productName}</strong>. Payment is Cash on Delivery (COD).
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
            <h3 className="text-xl font-bold">Order Placed Successfully!</h3>
            <p className="text-slate-500">We will contact you shortly to confirm delivery.</p>
            <Button onClick={() => setOpen(false)} className="mt-4 w-full">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Full Name</Label>
              <Input id="userName" name="userName" required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input id="mobileNumber" name="mobileNumber" type="tel" required placeholder="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea id="address" name="address" required placeholder="Full street address..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Alternate Contact / Email (Optional)</Label>
              <Input id="contact" name="contact" placeholder="Email or alternate phone" />
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-lg text-sm font-medium mt-4">
              Payment Method: Cash on Delivery (COD) Only
            </div>
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
              {loading ? "Processing..." : "Confirm Cash on Delivery"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
