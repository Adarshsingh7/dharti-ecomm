"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  name: string;
  price: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>View, pause, or delete your products.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-slate-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-slate-500">No products found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {product.isActive !== false ? 'Active' : 'Paused'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/products/${product._id}/edit`}>
                        <Button size="sm" variant="secondary">
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant={product.isActive !== false ? "outline" : "default"} 
                        onClick={() => toggleStatus(product._id, product.isActive !== false)}
                      >
                        {product.isActive !== false ? 'Pause' : 'Activate'}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteProduct(product._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
