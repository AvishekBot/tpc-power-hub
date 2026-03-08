import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Eye, MessageCircle, FileText } from "lucide-react";
import jsPDF from "jspdf";

const statuses = ["processing", "confirmed", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const viewOrder = async (order: any) => {
    setSelectedOrder(order);
    const { data } = await supabase.from("order_items").select("*").eq("order_id", order.id);
    setOrderItems(data || []);
  };

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders").update({ order_status: status }).eq("id", orderId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Order status updated to ${status}` }); fetchOrders(); if (selectedOrder?.id === orderId) setSelectedOrder({ ...selectedOrder, order_status: status }); }
  };

  const downloadInvoice = (order: any) => {
    const doc = new jsPDF();
    doc.setFontSize(20); doc.text("TPC Power Solutions", 20, 20);
    doc.setFontSize(12); doc.text("Invoice", 20, 30);
    doc.text(`Order: ${order.id.slice(0, 8)}`, 20, 40);
    doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 20, 48);
    doc.text(`Customer: ${order.customer_name}`, 20, 58);
    doc.text(`Phone: ${order.customer_phone}`, 20, 66);
    doc.text(`Address: ${order.customer_address}`, 20, 74);
    doc.text(`Total: Rs. ${order.total_amount}`, 20, 84);
    doc.text(`Payment: ${order.payment_method}`, 20, 92);
    doc.text(`Status: ${order.order_status}`, 20, 100);
    doc.save(`invoice-${order.id.slice(0, 8)}.pdf`);
  };

  const whatsapp = (phone: string) => {
    window.open(`https://wa.me/977${phone.replace(/\D/g, "")}`, "_blank");
  };

  const filtered = filterStatus === "all" ? orders : orders.filter(o => o.order_status === filterStatus);

  const statusColor = (s: string) => {
    if (s === "delivered") return "default";
    if (s === "cancelled") return "destructive";
    return "outline";
  };

  if (loading) return <div className="space-y-4">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Orders ({orders.length})</h2>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50 text-left text-gray-500">
                <th className="p-3">Order ID</th><th className="p-3">Customer</th><th className="p-3">Phone</th>
                <th className="p-3">Total</th><th className="p-3">Payment</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{o.id.slice(0, 8)}</td>
                    <td className="p-3">{o.customer_name}</td>
                    <td className="p-3">{o.customer_phone}</td>
                    <td className="p-3">Rs. {Number(o.total_amount).toLocaleString()}</td>
                    <td className="p-3">{o.payment_method}</td>
                    <td className="p-3">
                      <Select value={o.order_status || "processing"} onValueChange={(v) => updateStatus(o.id, v)}>
                        <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>{statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="p-3 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => viewOrder(o)}><Eye className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => downloadInvoice(o)}><FileText className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => whatsapp(o.customer_phone)} className="text-green-600"><MessageCircle className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-gray-500">No orders found</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Order #{selectedOrder?.id.slice(0, 8)}</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><strong>Customer:</strong> {selectedOrder.customer_name}</div>
                <div><strong>Phone:</strong> {selectedOrder.customer_phone}</div>
                <div><strong>Email:</strong> {selectedOrder.customer_email || "—"}</div>
                <div><strong>City:</strong> {selectedOrder.customer_city || "—"}</div>
                <div className="col-span-2"><strong>Address:</strong> {selectedOrder.customer_address}</div>
                <div><strong>Payment:</strong> {selectedOrder.payment_method}</div>
                <div><strong>Status:</strong> <Badge variant={statusColor(selectedOrder.order_status)}>{selectedOrder.order_status}</Badge></div>
              </div>
              <div>
                <strong>Items:</strong>
                <div className="mt-2 space-y-1">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex justify-between py-1 border-b">
                      <span>{item.product_name} × {item.quantity}</span>
                      <span>Rs. {(Number(item.price) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 font-bold">
                  <span>Total</span><span>Rs. {Number(selectedOrder.total_amount).toLocaleString()}</span>
                </div>
              </div>
              {selectedOrder.notes && <div><strong>Notes:</strong> {selectedOrder.notes}</div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
