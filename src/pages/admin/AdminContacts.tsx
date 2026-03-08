import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Eye, MessageCircle, Trash2, CheckCircle } from "lucide-react";

const AdminContacts = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const { toast } = useToast();

  const fetchData = async () => { setLoading(true); const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false }); setContacts(data || []); setLoading(false); };
  useEffect(() => { fetchData(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contacts").update({ is_read: true }).eq("id", id);
    toast({ title: "Marked as read" });
    fetchData();
  };

  const handleDelete = async () => { if (!deleteId) return; await supabase.from("contacts").delete().eq("id", deleteId); toast({ title: "Deleted" }); fetchData(); setDeleteId(null); };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contact Messages ({contacts.length})</h2>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Subject</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c.id} className={`border-b hover:bg-gray-50 ${!c.is_read ? "bg-blue-50/50" : ""}`}>
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3">{c.email || "—"}</td>
                  <td className="p-3">{c.phone || "—"}</td>
                  <td className="p-3 max-w-[200px] truncate">{c.subject || "—"}</td>
                  <td className="p-3"><Badge variant={c.is_read ? "secondary" : "default"}>{c.is_read ? "Read" : "New"}</Badge></td>
                  <td className="p-3 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => { setSelected(c); if (!c.is_read) markRead(c.id); }}><Eye className="h-4 w-4" /></Button>
                      {c.phone && <Button size="icon" variant="ghost" onClick={() => window.open(`https://wa.me/977${c.phone.replace(/\D/g, "")}`, "_blank")} className="text-green-600"><MessageCircle className="h-4 w-4" /></Button>}
                      {!c.is_read && <Button size="icon" variant="ghost" onClick={() => markRead(c.id)} className="text-blue-500"><CheckCircle className="h-4 w-4" /></Button>}
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(c.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-gray-500">No messages</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Message from {selected?.name}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div><strong>Email:</strong> {selected.email || "—"}</div>
              <div><strong>Phone:</strong> {selected.phone || "—"}</div>
              <div><strong>Subject:</strong> {selected.subject || "—"}</div>
              <div><strong>Message:</strong><p className="mt-1 bg-gray-50 p-3 rounded">{selected.message}</p></div>
              <div><strong>Date:</strong> {new Date(selected.created_at).toLocaleString()}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete Message?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminContacts;
