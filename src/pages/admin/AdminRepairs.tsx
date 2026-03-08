import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

const statuses = ["new", "confirmed", "in_progress", "completed", "cancelled"];

const AdminRepairs = () => {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetch = async () => { setLoading(true); const { data } = await supabase.from("repair_bookings").select("*").order("created_at", { ascending: false }); setRepairs(data || []); setLoading(false); };
  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("repair_bookings").update({ status }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Status updated to ${status}` }); fetch(); }
  };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Repair Bookings ({repairs.length})</h2>
      <Card><CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-3">Customer</th><th className="p-3">Phone</th><th className="p-3">Device</th><th className="p-3">Problem</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {repairs.map(r => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{r.customer_name}</td>
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3">{r.product_type} {r.brand_model && `(${r.brand_model})`}</td>
                  <td className="p-3 max-w-[200px] truncate">{r.problem}</td>
                  <td className="p-3 text-xs">{r.preferred_date || "—"}</td>
                  <td className="p-3">
                    <Select value={r.status || "new"} onValueChange={v => updateStatus(r.id, v)}>
                      <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}</SelectContent>
                    </Select>
                  </td>
                  <td className="p-3">
                    <Button size="icon" variant="ghost" onClick={() => window.open(`https://wa.me/977${r.phone.replace(/\D/g, "")}`, "_blank")} className="text-green-600">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {repairs.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-gray-500">No repair bookings</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>
    </div>
  );
};

export default AdminRepairs;
