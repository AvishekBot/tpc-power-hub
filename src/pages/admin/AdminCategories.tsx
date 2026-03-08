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

const AdminCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name_en: "", name_np: "", slug: "", icon: "", is_visible: true, display_order: 0 });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*").order("display_order");
    setCategories(data || []);
    setLoading(false);
  };
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditId(null); setForm({ name_en: "", name_np: "", slug: "", icon: "", is_visible: true, display_order: 0 }); setModalOpen(true); };
  const openEdit = (c: any) => { setEditId(c.id); setForm({ name_en: c.name_en, name_np: c.name_np || "", slug: c.slug, icon: c.icon || "", is_visible: c.is_visible, display_order: c.display_order || 0 }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name_en || !form.slug) { toast({ title: "Name and slug required", variant: "destructive" }); return; }
    setSaving(true);
    const { error } = editId
      ? await supabase.from("categories").update(form).eq("id", editId)
      : await supabase.from("categories").insert(form);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: editId ? "Category updated" : "Category added" }); setModalOpen(false); fetch(); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("categories").delete().eq("id", deleteId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Category deleted" }); fetch(); }
    setDeleteId(null);
  };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories ({categories.length})</h2>
        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add</Button>
      </div>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Name</th><th className="p-3">Slug</th><th className="p-3">Icon</th><th className="p-3">Order</th><th className="p-3">Visible</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{c.name_en}</td>
                  <td className="p-3">{c.slug}</td>
                  <td className="p-3">{c.icon || "—"}</td>
                  <td className="p-3">{c.display_order}</td>
                  <td className="p-3">{c.is_visible ? "✓" : "✗"}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(c.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-gray-500">No categories</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Category</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name (EN) *</Label><Input value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} /></div>
            <div className="space-y-2"><Label>Name (NP)</Label><Input value={form.name_np} onChange={e => setForm({ ...form, name_np: e.target.value })} /></div>
            <div className="space-y-2"><Label>Slug *</Label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></div>
            <div className="space-y-2"><Label>Icon (lucide name)</Label><Input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} /></div>
            <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_visible} onCheckedChange={v => setForm({ ...form, is_visible: v })} /><Label>Visible</Label></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">{saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Category?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCategories;
