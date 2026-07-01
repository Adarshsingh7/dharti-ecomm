"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminSettings() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match.", type: "error" });
      return;
    }
    
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setMessage({ text: "Password changed successfully!", type: "success" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: data.message || "Failed to change password", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An error occurred.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // In a real app you'd hit an API to clear the cookie.
    // For simplicity, we just clear the cookie via document.cookie and redirect.
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button variant="outline" onClick={handleLogout}>Log Out</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Change Master Password</CardTitle>
          <CardDescription>Update your dashboard login password to keep it secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <Input 
                id="oldPassword" 
                type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
            
            {message.text && (
              <div className={`text-sm font-medium ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                {message.text}
              </div>
            )}
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
