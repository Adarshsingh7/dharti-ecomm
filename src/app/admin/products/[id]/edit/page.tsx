"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [isFuture, setIsFuture] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setName(data.product.name);
          setPrice(data.product.price.toString());
          setDescription(data.product.description);
          setExistingImages(data.product.images || []);
          setIsFuture(data.product.isFuture || false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const removeExistingImage = (idx: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    
    // Add existing images that weren't deleted
    existingImages.forEach(img => {
      formData.append("existingImages", img);
    });
    
    formData.append("isFuture", isFuture.toString());
    
    // Add new files
    if (newFiles) {
      Array.from(newFiles).forEach(file => {
        formData.append("newImages", file);
      });
    }
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        body: formData,
      });
      
      const data = await res.json();
      if (data.success) {
        router.push("/admin/products");
      } else {
        alert("Failed to edit product");
      }
    } catch (error) {
      console.error(error);
      alert("Error editing product");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-8 text-center text-slate-500">Loading product details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Update information or replace images.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="min-h-[120px]" />
            </div>
            
            <div className="space-y-4">
              <Label>Existing Images & Videos</Label>
              {existingImages.length === 0 ? (
                <p className="text-sm text-slate-500">No media saved.</p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {existingImages.map((img, idx) => {
                    const isVideo = /\.(mp4|webm|ogg)$/i.test(img);
                    return (
                      <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                        {isVideo ? (
                          <video src={img} className="object-cover w-full h-full" muted />
                        ) : (
                          <img src={img} alt={`img ${idx}`} className="object-cover w-full h-full" />
                        )}
                        <button 
                          type="button" 
                          onClick={() => removeExistingImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newImages">Add New Images or Videos (Optional)</Label>
              <Input 
                id="newImages" 
                type="file" 
                multiple 
                accept="image/jpeg, image/png, image/webp, video/mp4, video/webm, video/ogg" 
                onChange={(e) => setNewFiles(e.target.files)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="isFuture" 
                name="isFuture" 
                checked={isFuture}
                onChange={(e) => setIsFuture(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500" 
              />
              <Label htmlFor="isFuture" className="font-medium cursor-pointer">Mark as "Coming Soon" (Future Product)</Label>
            </div>

            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
