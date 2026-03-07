import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, CheckCircle, Truck, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/hooks/use-supabase-data';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const statusSteps = ['processing', 'confirmed', 'shipped', 'delivered'];
const statusIcons: Record<string, any> = { processing: Clock, confirmed: CheckCircle, shipped: Truck, delivered: MapPin };

const TrackOrder = () => {
  const { t } = useLanguage();
  const { data: settings } = useSettings();
  const whatsapp = settings?.whatsapp || '977XXXXXXXXXX';
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!orderId.trim()) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId.trim())
      .maybeSingle();
    setLoading(false);
    if (error || !data) { setNotFound(true); return; }
    setOrder(data);
  };

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">{t('trackOrder')}</motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="bg-card rounded-xl p-6 border border-border transition-colors duration-300">
          <p className="text-muted-foreground text-sm mb-4">{t('enterOrderId')}</p>
          <div className="flex gap-2">
            <Input placeholder="Order ID (UUID)" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="min-h-[48px]" />
            <Button onClick={handleSearch} disabled={loading} className="bg-accent text-accent-foreground rounded-lg shrink-0 min-h-[48px]">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {loading && (
          <div className="mt-8 space-y-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
          </div>
        )}

        {order && (
          <div className="mt-8 bg-card rounded-xl p-6 border border-border transition-colors duration-300 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground">Order Status</p>
                <p className="font-bold text-foreground capitalize">{order.order_status}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-extrabold text-accent">Rs. {Number(order.total_amount).toLocaleString()}</p>
              </div>
            </div>

            {/* Status steps */}
            <div className="flex items-center gap-1 mt-4">
              {statusSteps.map((step, i) => {
                const currentIdx = statusSteps.indexOf(order.order_status || 'processing');
                const active = i <= currentIdx;
                return (
                  <div key={step} className="flex-1 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${active ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {i + 1}
                    </div>
                    <span className="text-[10px] mt-1 text-muted-foreground capitalize">{step}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-3 space-y-1">
              <p className="text-sm text-foreground font-semibold">Items</p>
              {(order.order_items || []).map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.product_name} × {item.quantity}</span>
                  <span className="text-foreground">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {notFound && (
          <div className="mt-8 bg-card rounded-xl p-6 border border-border text-center transition-colors duration-300">
            <p className="text-muted-foreground">Order not found. Please check the ID and try again.</p>
            <Button asChild variant="outline" className="mt-4 gap-2 border-green-500 text-green-600 dark:text-green-400 min-h-[48px]">
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi, I need help tracking my order')}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" /> Contact Support
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
