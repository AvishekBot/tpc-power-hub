import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

const AdminAnnouncements = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ text_en: "", text_np: "", is_active: true, display_order: 0 });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => { setLoading(true); const { data } = await supabase.from("announcements").select("*").order("display_order"); setItems(data || []); setLoading(false); };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditId(null); setForm({ text_en: "", text_np: "", is_active: true, display_order: 0 }); setModalOpen(true); };
  const openEdit = (a: any) => { setEditId(a.id); setForm({ text_en: a.text_en, text_np: a.text_np || "", is_active: a.is_active, display_order: a.display_order || 0 }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.text_en) { toast({ title: "English text required", variant: "destructive" }); return; }
    setSaving(true);
    const { error } = editId ? await supabase.from("announcements").update(form).eq("id", editId) : await supabase.from("announcements").insert(form);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: editId ? "Updated" : "Added" }); setModalOpen(false); fetchData(); }
    setSaving(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("announcements").update({ is_active: !current }).eq("id", id);
    toast({ title: `Announcement ${!current ? "activated" : "deactivated"}` });
    fetchData();
  };

  const handleDelete = async () => { if (!deleteId) return; await supabase.from("announcements").delete().eq("id", deleteId); toast({ title: "Deleted" }); fetchData(); setDeleteId(null); };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Announcements ({items.length})</h2>
        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add</Button>
      </div>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Text (EN)</th><th className="p-3">Text (NP)</th><th className="p-3">Order</th><th className="p-3">Active</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 max-w-[300px] truncate">{a.text_en}</td>
                  <td className="p-3 max-w-[200px] truncate">{a.text_np || "—"}</td>
                  <td className="p-3">{a.display_order}</td>
                  <td className="p-3"><Switch checked={a.is_active} onCheckedChange={() => toggleActive(a.id, a.is_active)} /></td>
                  <td className="p-3"><div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(a)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeleteId(a.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                  </div></td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No announcements</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Announcement</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Text (EN) *</Label><Input value={form.text_en} onChange={e => setForm({ ...form, text_en: e.target.value })} /></div>
            <div className="space-y-2"><Label>Text (NP)</Label><Input value={form.text_np} onChange={e => setForm({ ...form, text_np: e.target.value })} /></div>
            <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => setForm({ ...form, is_active: v })} /><Label>Active</Label></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">{saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminAnnouncements;
