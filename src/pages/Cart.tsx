import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { t } = useLanguage();
  const { items, updateQuantity, removeItem } = useCartStore();
  const subtotal = useCartStore((s) => s.subtotal());

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background transition-colors duration-300">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-bold mb-2 text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to get started!</p>
        <Button asChild className="bg-accent text-accent-foreground rounded-lg min-h-[48px]"><Link to="/products">{t('browseProducts')}</Link></Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-6 text-foreground">{t('cart')}</h1>
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-xl p-4 border border-border flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors duration-300">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate text-foreground">{item.name}</h3>
                  <p className="text-accent font-bold text-sm">Rs. {(item.sale_price || item.price).toLocaleString()}</p>
                </div>
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-muted transition-colors"><Minus className="w-3 h-3" /></button>
                  <span className="px-3 text-sm font-bold text-foreground">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-muted transition-colors"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="font-bold text-sm text-foreground">Rs. {((item.sale_price || item.price) * item.quantity).toLocaleString()}</div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl p-6 border border-border h-fit sticky top-24 transition-colors duration-300">
            <h3 className="font-bold mb-4 text-foreground">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-bold text-foreground">Rs. {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-muted-foreground">Calculated at checkout</span></div>
              <div className="border-t border-border pt-2 flex justify-between text-lg font-extrabold"><span className="text-foreground">Total</span><span className="text-accent">Rs. {subtotal.toLocaleString()}</span></div>
            </div>
            <Button asChild className="w-full mt-6 bg-accent text-accent-foreground rounded-lg h-12 font-bold hover:scale-105 transition-all duration-200">
              <Link to="/checkout">{t('proceedCheckout')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
