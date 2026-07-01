"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  userName: string;
  mobileNumber: string;
  address: string;
  product: { name: string; price: number };
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Manage customer orders and update their delivery status.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-slate-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-slate-500">No orders yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="font-medium">{order.userName}</div>
                      <div className="text-sm text-slate-500">{order.mobileNumber}</div>
                      <div className="text-xs text-slate-400 max-w-[200px] truncate" title={order.address}>{order.address}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{order.product?.name || 'Deleted Product'}</div>
                      <div className="text-sm text-slate-500">₹{order.product?.price || 0} ({order.paymentMethod})</div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processed' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {order.status === 'Pending' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(order._id, 'Processed')}>
                          Mark Processed
                        </Button>
                      )}
                      {order.status === 'Processed' && (
                        <Button size="sm" variant="default" onClick={() => updateStatus(order._id, 'Delivered')}>
                          Mark Delivered
                        </Button>
                      )}
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
