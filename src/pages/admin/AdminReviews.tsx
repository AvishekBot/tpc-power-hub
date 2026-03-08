import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Trash2, Star } from "lucide-react";

const AdminReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => { setLoading(true); const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false }); setReviews(data || []); setLoading(false); };
  useEffect(() => { fetchData(); }, []);

  const toggleApproval = async (id: string, current: boolean) => {
    await supabase.from("reviews").update({ is_approved: !current }).eq("id", id);
    toast({ title: !current ? "Review approved" : "Review rejected" });
    fetchData();
  };

  const handleDelete = async () => { if (!deleteId) return; await supabase.from("reviews").delete().eq("id", deleteId); toast({ title: "Deleted" }); fetchData(); setDeleteId(null); };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Customer</th><th className="p-3">Rating</th><th className="p-3">Message</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{r.customer_name}<br /><span className="text-xs text-gray-400">{r.customer_city}</span></td>
                  <td className="p-3"><div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />{r.rating}</div></td>
                  <td className="p-3 max-w-[300px] truncate">{r.message || "—"}</td>
                  <td className="p-3"><Badge variant={r.is_approved ? "default" : "secondary"}>{r.is_approved ? "Approved" : "Pending"}</Badge></td>
                  <td className="p-3 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => toggleApproval(r.id, r.is_approved)} className={r.is_approved ? "text-orange-500" : "text-green-500"}>
                        {r.is_approved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(r.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-gray-500">No reviews</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete Review?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-red-600">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminReviews;
