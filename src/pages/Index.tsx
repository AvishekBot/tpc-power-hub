import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Star, ShieldCheck, Users, Truck, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { categories } from '@/lib/categories';
import { sampleProducts, sampleReviews } from '@/lib/sampleData';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const StatCounter = ({ value, label }: { value: string; label: string }) => (
  <motion.div variants={fadeUp} className="text-center">
    <div className="text-3xl md:text-4xl font-extrabold text-accent">{value}</div>
    <div className="text-sm text-primary-foreground/70 mt-1">{label}</div>
  </motion.div>
);

const Index = () => {
  const { t } = useLanguage();
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();
  const featured = sampleProducts.filter((p) => p.is_featured).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy circuit-pattern relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
                {t('heroTitle')}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-4 text-primary-foreground/70 text-lg max-w-lg">
                {t('heroSubtitle')}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg px-6 h-12 text-base font-bold">
                  <Link to="/products">{t('browseProducts')}</Link>
                </Button>
                <Button asChild variant="outline" className="border-amber text-amber hover:bg-amber/10 rounded-lg px-6 h-12 text-base font-bold">
                  <Link to="/contact">{t('getQuote')}</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="hidden md:flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative bg-navy-light rounded-full w-full h-full flex items-center justify-center border border-accent/30">
                  <Zap className="w-24 h-24 text-accent" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Stats */}
        <div className="bg-navy-light border-t border-primary-foreground/10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter value={t('stats500')} label={t('statsProducts')} />
            <StatCounter value={t('stats1000')} label={t('statsCustomers')} />
            <StatCounter value={t('stats10')} label={t('statsYears')} />
            <StatCounter value={t('statsNationwide')} label={t('statsDelivery')} />
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-2xl md:text-3xl font-extrabold text-center mb-10">
            {t('ourProductRange')}
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="block bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-lg hover:border-accent border border-transparent transition-all group"
                >
                  <cat.icon className="w-10 h-10 mx-auto text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-sm text-card-foreground">{cat.name}</div>
                  <div className="text-xs text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    {t('viewAll')} <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-navy circuit-pattern">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-2xl md:text-3xl font-extrabold text-center text-primary-foreground mb-10">
            {t('featuredProducts')}
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-48 bg-muted flex items-center justify-center">
                  <Zap className="w-16 h-16 text-muted-foreground/30" />
                  {product.sale_price && (
                    <span className="absolute top-2 left-2 bg-amber text-amber-foreground text-xs font-bold px-2 py-1 rounded">
                      {t('sale')}
                    </span>
                  )}
                  {product.is_featured && (
                    <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                      {t('featured')}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-card-foreground truncate">{product.name}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-accent">
                      Rs. {(product.sale_price || product.price).toLocaleString()}
                    </span>
                    {product.sale_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-amber hover:bg-amber/90 text-amber-foreground text-xs rounded-lg font-bold"
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, sale_price: product.sale_price, image: '/placeholder.svg' })}
                    >
                      {t('addToCart')}
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs rounded-lg border-accent text-accent hover:bg-accent/10" asChild>
                      <Link to={`/products/${product.slug}`}>{t('viewDetails')}</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-2xl md:text-3xl font-extrabold text-center mb-10">
            {t('whyChooseUs')}
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: t('isoCertified'), desc: t('isoDesc') },
              { icon: Users, title: t('expertEngineers'), desc: t('engineersDesc') },
              { icon: Wrench, title: t('afterSales'), desc: t('afterSalesDesc') },
              { icon: Truck, title: t('nationwideDelivery'), desc: t('deliveryDesc') },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card rounded-lg p-6 text-center shadow-sm border hover:shadow-md hover:border-accent transition-all">
                <item.icon className="w-10 h-10 mx-auto text-accent mb-4" />
                <h3 className="font-bold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-navy circuit-pattern">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-2xl md:text-3xl font-extrabold text-center text-primary-foreground mb-10">
            {t('customerReviews')}
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sampleReviews.map((review) => (
              <motion.div key={review.id} variants={fadeUp} className="bg-card rounded-lg p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                  ))}
                </div>
                <p className="text-sm text-card-foreground mb-4">"{review.message}"</p>
                <div>
                  <div className="font-semibold text-sm text-card-foreground">{review.customer_name}</div>
                  <div className="text-xs text-muted-foreground">{review.customer_city}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Repair CTA */}
      <section className="bg-amber py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-foreground mb-4">{t('repairCTA')}</h2>
          <Button asChild className="bg-navy hover:bg-navy-light text-primary-foreground rounded-lg px-8 h-12 text-base font-bold">
            <Link to="/repair-booking">{t('repairCTABtn')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
