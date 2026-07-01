"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // The images input might not append multiple files properly if not handled, 
    // but standard HTML form with multiple attribute handles it via FormData if name="images".
    // We explicitly re-append to be safe if needed, but FormData(e.currentTarget) is fine.
    
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Enter the information and upload images for the new product.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" required placeholder="e.g. Premium Dhatri Oil" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" name="price" type="number" min="0" required placeholder="999" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required placeholder="Describe the product benefits..." className="min-h-[120px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Product Images (Multiple allowed)</Label>
              <Input 
                id="images" 
                name="images" 
                type="file" 
                multiple 
                accept="image/jpeg, image/png, image/webp" 
                required 
                onChange={(e) => setFiles(e.target.files)}
              />
              <p className="text-xs text-slate-500">Please upload JPG, PNG, or WEBP images (HEIC is not supported by browsers).</p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding Product..." : "Save Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
