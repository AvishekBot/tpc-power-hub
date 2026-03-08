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

const empty = { title: "", image_url: "", link_url: "", position: "homepage_carousel", is_active: true, display_order: 0, start_date: "", end_date: "" };

const AdminAds = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchAds = async () => { setLoading(true); const { data } = await supabase.from("ads").select("*").order("display_order"); setAds(data || []); setLoading(false); };
  useEffect(() => { fetchAds(); }, []);

  const openAdd = () => { setEditId(null); setForm(empty); setModalOpen(true); };
  const openEdit = (a: any) => { setEditId(a.id); setForm({ title: a.title, image_url: a.image_url || "", link_url: a.link_url || "", position: a.position || "homepage_carousel", is_active: a.is_active, display_order: a.display_order || 0, start_date: a.start_date || "", end_date: a.end_date || "" }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.title) { toast({ title: "Title required", variant: "destructive" }); return; }
    setSaving(true);
    const payload = { ...form, start_date: form.start_date || null, end_date: form.end_date || null };
    const { error } = editId ? await supabase.from("ads").update(payload).eq("id", editId) : await supabase.from("ads").insert(payload);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: editId ? "Ad updated" : "Ad added" }); setModalOpen(false); fetchAds(); }
    setSaving(false);
  };

  const handleDelete = async () => { if (!deleteId) return; await supabase.from("ads").delete().eq("id", deleteId); toast({ title: "Ad deleted" }); fetchAds(); setDeleteId(null); };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ads ({ads.length})</h2>
        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add Ad</Button>
      </div>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Image</th><th className="p-3">Title</th><th className="p-3">Position</th><th className="p-3">Active</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {ads.map(a => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{a.image_url ? <img src={a.image_url} className="w-20 h-12 object-cover rounded" /> : "—"}</td>
                  <td className="p-3 font-medium">{a.title}</td>
                  <td className="p-3">{a.position}</td>
                  <td className="p-3">{a.is_active ? "✓" : "✗"}</td>
                  <td className="p-3"><div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(a)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeleteId(a.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                  </div></td>
                </tr>
              ))}
              {ads.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No ads</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Ad</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} /></div>
            <div className="space-y-2"><Label>Link URL</Label><Input value={form.link_url} onChange={e => setForm({ ...form, link_url: e.target.value })} /></div>
            <div className="space-y-2"><Label>Position</Label><Input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} /></div>
              <div className="space-y-2"><Label>End Date</Label><Input type="date" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} /></div>
            </div>
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
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete Ad?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminAds;
