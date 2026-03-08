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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

const empty = { title_en: "", title_np: "", slug: "", content: "", category: "", thumbnail_url: "", is_published: false, meta_title: "", meta_description: "", tags: [] as string[] };

const AdminBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => { setLoading(true); const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }); setPosts(data || []); setLoading(false); };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditId(null); setForm(empty); setTagsInput(""); setModalOpen(true); };
  const openEdit = (p: any) => {
    setEditId(p.id);
    setForm({ title_en: p.title_en, title_np: p.title_np || "", slug: p.slug, content: p.content || "", category: p.category || "", thumbnail_url: p.thumbnail_url || "", is_published: p.is_published, meta_title: p.meta_title || "", meta_description: p.meta_description || "", tags: p.tags || [] });
    setTagsInput((p.tags || []).join(", "));
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title_en || !form.slug) { toast({ title: "Title and slug required", variant: "destructive" }); return; }
    setSaving(true);
    const tags = tagsInput.split(",").map(s => s.trim()).filter(Boolean);
    const payload = { ...form, tags };
    const { error } = editId ? await supabase.from("blog_posts").update(payload).eq("id", editId) : await supabase.from("blog_posts").insert(payload);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: editId ? "Updated" : "Added" }); setModalOpen(false); fetchData(); }
    setSaving(false);
  };

  const handleDelete = async () => { if (!deleteId) return; await supabase.from("blog_posts").delete().eq("id", deleteId); toast({ title: "Deleted" }); fetchData(); setDeleteId(null); };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts ({posts.length})</h2>
        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add Post</Button>
      </div>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{p.title_en}</td>
                  <td className="p-3">{p.category || "—"}</td>
                  <td className="p-3"><Badge variant={p.is_published ? "default" : "secondary"}>{p.is_published ? "Published" : "Draft"}</Badge></td>
                  <td className="p-3 text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="p-3"><div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeleteId(p.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                  </div></td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No blog posts</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Add"} Blog Post</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Title (EN) *</Label><Input value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} /></div>
              <div className="space-y-2"><Label>Title (NP)</Label><Input value={form.title_np} onChange={e => setForm({ ...form, title_np: e.target.value })} /></div>
              <div className="space-y-2"><Label>Slug *</Label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></div>
              <div className="space-y-2"><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Content</Label><Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8} /></div>
            <div className="space-y-2"><Label>Thumbnail URL</Label><Input value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} /></div>
            <div className="space-y-2"><Label>Tags (comma separated)</Label><Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Meta Title</Label><Input value={form.meta_title} onChange={e => setForm({ ...form, meta_title: e.target.value })} /></div>
              <div className="space-y-2"><Label>Meta Description</Label><Input value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={v => setForm({ ...form, is_published: v })} /><Label>Published</Label></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">{saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete Post?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBlog;
