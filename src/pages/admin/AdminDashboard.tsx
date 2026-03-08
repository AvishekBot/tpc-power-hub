import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Clock, DollarSign, Mail, Wrench, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, pendingOrders: 0, revenue: 0, contacts: 0, repairs: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, ordersRes, contactsRes, repairsRes, lowStockRes, recentOrdersRes, recentContactsRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id, total_amount, order_status", { count: "exact" }),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
        supabase.from("repair_bookings").select("id", { count: "exact", head: true }),
        supabase.from("products").select("name, stock, slug").lt("stock", 5).order("stock", { ascending: true }).limit(5),
        supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(3),
      ]);

      const orders = ordersRes.data || [];
      const pendingOrders = orders.filter((o) => o.order_status === "processing" || o.order_status === "pending").length;
      const revenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

      setStats({
        products: productsRes.count || 0,
        orders: ordersRes.count || 0,
        pendingOrders,
        revenue,
        contacts: contactsRes.count || 0,
        repairs: repairsRes.count || 0,
      });
      setRecentOrders(recentOrdersRes.data || []);
      setLowStock(lowStockRes.data || []);
      setRecentContacts(recentContactsRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "text-blue-600 bg-blue-100" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "text-green-600 bg-green-100" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Clock, color: "text-orange-600 bg-orange-100" },
    { label: "Total Revenue", value: `Rs. ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-purple-600 bg-purple-100" },
    { label: "Total Contacts", value: stats.contacts, icon: Mail, color: "text-pink-600 bg-pink-100" },
    { label: "Pending Repairs", value: stats.repairs, icon: Wrench, color: "text-teal-600 bg-teal-100" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Orders</CardTitle></CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left text-gray-500">
                    <th className="pb-2">Customer</th><th className="pb-2">Total</th><th className="pb-2">Status</th>
                  </tr></thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id} className="border-b last:border-0">
                        <td className="py-2">{o.customer_name}</td>
                        <td className="py-2">Rs. {Number(o.total_amount).toLocaleString()}</td>
                        <td className="py-2"><Badge variant="outline">{o.order_status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock */}
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-orange-500" /> Low Stock Alerts</CardTitle></CardHeader>
          <CardContent>
            {lowStock.length === 0 ? (
              <p className="text-gray-500 text-sm">All products are well stocked</p>
            ) : (
              <div className="space-y-2">
                {lowStock.map((p) => (
                  <div key={p.slug} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="text-sm">{p.name}</span>
                    <Badge variant={p.stock === 0 ? "destructive" : "outline"}>{p.stock} left</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Contacts */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Messages</CardTitle></CardHeader>
        <CardContent>
          {recentContacts.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">{c.name}</p>
                    <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500">{c.subject}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
