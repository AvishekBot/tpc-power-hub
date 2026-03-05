import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, MessageCircle, Minus, Plus, Zap, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { sampleProducts, sampleReviews } from '@/lib/sampleData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetail = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  const product = sampleProducts.find((p) => p.slug === slug);
  if (!product) return <div className="container mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">Product not found</p><Link to="/products" className="text-accent underline mt-4 inline-block">{t('browseProducts')}</Link></div>;

  const reviews = sampleReviews.filter((r) => r.product_id === product.id && r.is_approved);
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;
  const related = sampleProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inStock = product.stock > 0;

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors">{t('home')}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-accent transition-colors">{t('products')}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Image */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl aspect-square flex items-center justify-center border border-border">
            <Zap className="w-24 h-24 md:w-32 md:h-32 text-muted-foreground/20" />
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-xs font-bold bg-accent/10 text-accent px-2 py-1 rounded">{product.category.replace('-', ' ').toUpperCase()}</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground mt-3">{product.name}</h1>
            
            {avgRating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'fill-amber text-amber' : 'text-muted-foreground/30'}`} />)}</div>
                <span className="text-sm text-muted-foreground">{avgRating} ({reviews.length} reviews)</span>
              </div>
            )}

            <div className={`mt-3 inline-block text-xs font-bold px-2 py-1 rounded ${inStock ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
              {inStock ? `In Stock (${product.stock})` : t('outOfStock')}
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-extrabold text-accent">Rs. {(product.sale_price || product.price).toLocaleString()}</span>
              {product.sale_price && <span className="text-base md:text-lg text-muted-foreground line-through">Rs. {product.price.toLocaleString()}</span>}
            </div>

            <p className="mt-4 text-muted-foreground" style={{ lineHeight: 1.7 }}>{product.description}</p>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="px-4 font-bold text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                disabled={!inStock}
                className="bg-amber hover:bg-amber/90 text-amber-foreground rounded-lg px-6 md:px-8 h-12 font-bold gap-2 hover:scale-105 transition-all duration-200"
                onClick={() => { for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, price: product.price, sale_price: product.sale_price, image: '/placeholder.svg' }); }}
              >
                <ShoppingCart className="w-4 h-4" /> {t('addToCart')}
              </Button>
              <Button disabled={!inStock} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg px-6 md:px-8 h-12 font-bold hover:scale-105 transition-all duration-200" asChild>
                <Link to="/checkout">Buy Now</Link>
              </Button>
              <Button variant="outline" className="border-green-500 text-green-600 dark:text-green-400 rounded-lg h-12 gap-2" asChild>
                <a href={`https://wa.me/977XXXXXXXXXX?text=Hi, I'm interested in ${product.name}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" /> Inquire on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="bg-muted">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4 text-muted-foreground leading-relaxed">
            <p>{product.description}</p>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="border border-border rounded-xl overflow-hidden">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <div key={key} className={`flex ${i % 2 === 0 ? 'bg-muted/50' : 'bg-card'}`}>
                  <div className="w-1/3 p-3 font-semibold text-sm border-r border-border text-foreground">{key}</div>
                  <div className="w-2/3 p-3 text-sm text-muted-foreground">{value}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card p-4 rounded-xl border border-border">
                <div className="flex gap-1 mb-2">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-amber text-amber" />)}</div>
                <p className="text-sm text-card-foreground">"{r.message}"</p>
                <div className="mt-2 text-xs text-muted-foreground">{r.customer_name}, {r.customer_city}</div>
              </div>
            ))}
            {reviews.length === 0 && <p className="text-muted-foreground text-sm">No reviews yet.</p>}
          </TabsContent>
        </Tabs>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-extrabold mb-6 text-foreground">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="bg-card rounded-xl p-4 border border-border hover:border-accent hover:-translate-y-1 transition-all duration-300">
                  <div className="h-28 md:h-32 bg-muted rounded flex items-center justify-center mb-3"><Zap className="w-10 h-10 text-muted-foreground/30" /></div>
                  <h3 className="font-semibold text-sm truncate text-foreground">{p.name}</h3>
                  <p className="text-accent font-bold text-sm mt-1">Rs. {(p.sale_price || p.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
