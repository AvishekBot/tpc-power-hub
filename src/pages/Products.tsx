import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Zap, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { categories } from '@/lib/categories';
import { sampleProducts } from '@/lib/sampleData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Products = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const addItem = useCartStore((s) => s.addItem);
  const [search, setSearch] = useState('');
  const [mobileFilters, setMobileFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const filtered = useMemo(() => {
    let items = sampleProducts.filter((p) => p.is_active);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedCategories.length > 0) {
      items = items.filter((p) => selectedCategories.includes(p.category));
    }
    if (inStockOnly) {
      items = items.filter((p) => p.stock > 0);
    }
    switch (sortBy) {
      case 'price-asc': items.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price)); break;
      case 'price-desc': items.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price)); break;
      case 'featured': items.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)); break;
    }
    return items;
  }, [search, selectedCategories, sortBy, inStockOnly]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-sm mb-3 text-foreground">{t('filterBy')}</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2 text-sm cursor-pointer text-foreground">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="rounded border-border text-accent focus:ring-accent"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-sm mb-3 text-foreground">{t('sortBy')}</h3>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground min-h-[48px]">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm cursor-pointer text-foreground">
        <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="rounded" />
        {t('inStockOnly')}
      </label>
    </div>
  );

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <div className="bg-navy py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-foreground">{t('products')}</h1>
          <div className="mt-4 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('searchProducts')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-0 rounded-lg min-h-[48px]"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <Button variant="outline" className="gap-2 min-h-[48px]" onClick={() => setMobileFilters(true)}>
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </Button>
        </div>

        {mobileFilters && (
          <div className="fixed inset-0 z-50 bg-background p-6 overflow-auto lg:hidden transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-foreground">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <FilterSidebar />
            <Button className="w-full mt-6 bg-accent text-accent-foreground min-h-[48px]" onClick={() => setMobileFilters(false)}>Apply</Button>
          </div>
        )}

        <div className="flex gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-accent border border-border transition-all duration-300 group">
                  <div className="relative h-40 md:h-48 bg-muted flex items-center justify-center">
                    <Zap className="w-12 md:w-16 h-12 md:h-16 text-muted-foreground/30" />
                    {product.stock === 0 && <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">{t('outOfStock')}</span>}
                    {product.sale_price && product.stock > 0 && <span className="absolute top-2 left-2 bg-amber text-amber-foreground text-xs font-bold px-2 py-1 rounded">{t('sale')}</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-card-foreground truncate">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-accent">Rs. {(product.sale_price || product.price).toLocaleString()}</span>
                      {product.sale_price && <span className="text-sm text-muted-foreground line-through">Rs. {product.price.toLocaleString()}</span>}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        disabled={product.stock === 0}
                        className="flex-1 bg-amber hover:bg-amber/90 text-amber-foreground text-xs rounded-lg font-bold hover:scale-105 transition-all duration-200"
                        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, sale_price: product.sale_price, image: '/placeholder.svg' })}
                      >
                        {t('addToCart')}
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs rounded-lg border-accent text-accent" asChild>
                        <Link to={`/products/${product.slug}`}>{t('viewDetails')}</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">{t('noResults')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
