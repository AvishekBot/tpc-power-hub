import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

const empty = { question_en: "", question_np: "", answer_en: "", answer_np: "", category: "", is_visible: true, display_order: 0 };

const AdminFAQs = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => { setLoading(true); const { data } = await supabase.from("faqs").select("*").order("display_order"); setItems(data || []); setLoading(false); };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditId(null); setForm(empty); setModalOpen(true); };
  const openEdit = (f: any) => { setEditId(f.id); setForm({ question_en: f.question_en, question_np: f.question_np || "", answer_en: f.answer_en, answer_np: f.answer_np || "", category: f.category || "", is_visible: f.is_visible, display_order: f.display_order || 0 }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.question_en || !form.answer_en) { toast({ title: "Question and answer required", variant: "destructive" }); return; }
    setSaving(true);
    const { error } = editId ? await supabase.from("faqs").update(form).eq("id", editId) : await supabase.from("faqs").insert(form);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: editId ? "Updated" : "Added" }); setModalOpen(false); fetchData(); }
    setSaving(false);
  };

  const handleDelete = async () => { if (!deleteId) return; await supabase.from("faqs").delete().eq("id", deleteId); toast({ title: "Deleted" }); fetchData(); setDeleteId(null); };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">FAQs ({items.length})</h2>
        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add FAQ</Button>
      </div>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Question</th><th className="p-3">Category</th><th className="p-3">Order</th><th className="p-3">Visible</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(f => (
                <tr key={f.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 max-w-[400px] truncate font-medium">{f.question_en}</td>
                  <td className="p-3">{f.category || "—"}</td>
                  <td className="p-3">{f.display_order}</td>
                  <td className="p-3">{f.is_visible ? "✓" : "✗"}</td>
                  <td className="p-3"><div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(f)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeleteId(f.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                  </div></td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No FAQs</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} FAQ</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Question (EN) *</Label><Input value={form.question_en} onChange={e => setForm({ ...form, question_en: e.target.value })} /></div>
            <div className="space-y-2"><Label>Question (NP)</Label><Input value={form.question_np} onChange={e => setForm({ ...form, question_np: e.target.value })} /></div>
            <div className="space-y-2"><Label>Answer (EN) *</Label><Textarea value={form.answer_en} onChange={e => setForm({ ...form, answer_en: e.target.value })} rows={4} /></div>
            <div className="space-y-2"><Label>Answer (NP)</Label><Textarea value={form.answer_np} onChange={e => setForm({ ...form, answer_np: e.target.value })} rows={4} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
              <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.is_visible} onCheckedChange={v => setForm({ ...form, is_visible: v })} /><Label>Visible</Label></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">{saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete FAQ?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminFAQs;
