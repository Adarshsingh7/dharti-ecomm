"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        if (data.success) {
          setContacts(data.contacts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Messages & Inquiries</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Messages</CardTitle>
          <CardDescription>View contract requests and messages from the contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-slate-500">Loading messages...</p>
          ) : contacts.length === 0 ? (
            <p className="text-slate-500">No messages yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell className="align-top whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="align-top font-medium">
                      {contact.name}
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <div>{contact.phone}</div>
                      <div className="text-slate-500">{contact.email}</div>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                        {contact.message}
                      </p>
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
