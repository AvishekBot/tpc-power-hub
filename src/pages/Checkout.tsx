import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const nepalDistricts = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar', 'Birgunj', 'Dharan', 'Butwal', 'Hetauda', 'Janakpur', 'Nepalgunj', 'Bharatpur', 'Dhangadhi', 'Itahari', 'Other'];

const Checkout = () => {
  const { t } = useLanguage();
  const { items, subtotal, clearCart } = useCartStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', district: '', postal: '', notes: '', payment: 'cod' });
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(() => `TPC-${Date.now().toString(36).toUpperCase()}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.district) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    setSubmitted(true);
    clearCart();
    toast({ title: t('orderSuccess') });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background px-4 transition-colors duration-300">
        <div className="bg-card rounded-xl p-8 border border-border max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-extrabold mb-2 text-foreground">{t('orderSuccess')}</h2>
          <p className="text-muted-foreground mb-4">Order ID: <span className="font-bold text-foreground">{orderId}</span></p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-accent text-accent-foreground rounded-lg min-h-[48px]"><Link to="/products">{t('continueShopping')}</Link></Button>
            <Button asChild variant="outline" className="rounded-lg min-h-[48px]"><Link to={`/track-order?id=${orderId}`}>{t('trackOrder')}</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background transition-colors duration-300">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button asChild className="bg-accent text-accent-foreground rounded-lg min-h-[48px]"><Link to="/products">{t('browseProducts')}</Link></Button>
      </div>
    );
  }

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-6 text-foreground">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <h3 className="font-bold text-foreground">Delivery Details</h3>
              <Input placeholder="Full Name *" value={form.name} onChange={(e) => update('name', e.target.value)} required className="min-h-[48px]" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="min-h-[48px]" />
                <Input placeholder="Phone *" value={form.phone} onChange={(e) => update('phone', e.target.value)} required className="min-h-[48px]" />
              </div>
              <Input placeholder="Delivery Address *" value={form.address} onChange={(e) => update('address', e.target.value)} required className="min-h-[48px]" />
              <div className="grid sm:grid-cols-3 gap-4">
                <Input placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} className="min-h-[48px]" />
                <select value={form.district} onChange={(e) => update('district', e.target.value)} className="border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground min-h-[48px]" required>
                  <option value="">District *</option>
                  {nepalDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <Input placeholder="Postal Code" value={form.postal} onChange={(e) => update('postal', e.target.value)} className="min-h-[48px]" />
              </div>
              <textarea placeholder="Order Notes (optional)" value={form.notes} onChange={(e) => update('notes', e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground min-h-[80px]" />
            </div>

            <div className="bg-card rounded-xl p-6 border border-border space-y-3">
              <h3 className="font-bold text-foreground">Payment Method</h3>
              {[
                { value: 'khalti', label: '💜 Khalti' },
                { value: 'esewa', label: '🟢 eSewa' },
                { value: 'imepay', label: '🔵 IME Pay' },
                { value: 'cod', label: '💵 Cash on Delivery' },
              ].map((pm) => (
                <label key={pm.value} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:border-accent transition-colors duration-200 min-h-[48px]">
                  <input type="radio" name="payment" value={pm.value} checked={form.payment === pm.value} onChange={(e) => update('payment', e.target.value)} />
                  <span className="font-medium text-sm text-foreground">{pm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border h-fit sticky top-24">
            <h3 className="font-bold mb-4 text-foreground">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="truncate mr-2 text-foreground">{item.name} × {item.quantity}</span>
                  <span className="shrink-0 text-foreground">Rs. {((item.sale_price || item.price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-extrabold text-lg">
                <span className="text-foreground">Total</span>
                <span className="text-accent">Rs. {subtotal().toLocaleString()}</span>
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 bg-accent text-accent-foreground rounded-lg h-12 font-bold hover:scale-105 transition-all duration-200">{t('placeOrder')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
