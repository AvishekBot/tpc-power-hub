import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Star, ShieldCheck, Users, Truck, Wrench, Shield, Battery, Sun, Activity, Cpu, Cable, Flame, Lightbulb, LayoutGrid, GitBranch, ToggleLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { useFeaturedProducts, useCategories, useSettings, useReviews } from '@/hooks/use-supabase-data';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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

// Map category slugs to unique lucide icons
const categoryIconMap: Record<string, any> = {
  'ups-systems': Shield,
  'home-inverters': Battery,
  'solar-solutions': Sun,
  'servo-stabilizers': Activity,
  'batteries': Zap,
  'transformers': Cpu,
  'wiring': Cable,
  'generators': Flame,
  'led-lights': Lightbulb,
  'panel-boards': LayoutGrid,
  'cables': GitBranch,
  'switchgear': ToggleLeft,
  'vfd-drives': Cpu,
  'rectifiers': GitBranch,
  'battery-chargers': Battery,
  'welding-machines': Wrench,
  'relay-stabilizers': Cable,
};

const Index = () => {
  const { t } = useLanguage();
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();
  const { data: featured, isLoading: loadingFeatured } = useFeaturedProducts();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: settings } = useSettings();
  const { data: reviews, isLoading: loadingReviews } = useReviews();

  const heroHeadline = settings?.hero_headline_en || t('heroTitle');
  const heroSubtext = settings?.hero_subtext_en || t('heroSubtitle');
  const statProducts = settings?.stat_products || t('stats500');
  const statCustomers = settings?.stat_customers || t('stats1000');
  const statYears = settings?.stat_years || t('stats10');
  const statCenters = settings?.stat_centers || t('statsNationwide');

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy circuit-pattern relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [-20, 20, -20], x: [0, 10, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[8%] text-accent/15">
            <Zap className="w-16 h-16" />
          </motion.div>
          <motion.div animate={{ y: [10, -15, 10], x: [-5, 5, -5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[60%] left-[5%] text-accent/10">
            <Zap className="w-10 h-10" />
          </motion.div>
          <motion.div animate={{ y: [-10, 20, -10], rotate: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[20%] right-[12%] text-amber/10">
            <Zap className="w-12 h-12" />
          </motion.div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <motion.line x1="10%" y1="20%" x2="40%" y2="80%" stroke="hsl(217, 91%, 60%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} />
            <motion.line x1="60%" y1="10%" x2="90%" y2="70%" stroke="hsl(217, 91%, 60%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1.5 }} />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--navy))]/50" />
        </div>

        <div className="container mx-auto px-4 py-14 sm:py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
                {heroHeadline}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 text-primary-foreground/70 text-base md:text-lg max-w-lg" style={{ lineHeight: 1.7 }}>
                {heroSubtext}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4">
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg px-8 h-12 text-base font-bold hover:scale-105 transition-all duration-200 shadow-lg shadow-accent/25">
                  <Link to="/products">{t('browseProducts')}</Link>
                </Button>
                <Button asChild variant="outline" className="border-amber text-amber hover:bg-amber/10 rounded-lg px-8 h-12 text-base font-bold hover:scale-105 transition-all duration-200">
                  <Link to="/contact">{t('getQuote')}</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="hidden md:flex justify-center">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-[-10px] border border-dashed border-accent/20 rounded-full" />
                <div className="relative bg-navy-light rounded-full w-full h-full flex items-center justify-center border border-accent/30 shadow-2xl shadow-accent/10">
                  <Zap className="w-24 h-24 lg:w-28 lg:h-28 text-accent drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="bg-navy-light border-t border-primary-foreground/10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="container mx-auto px-4 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCounter value={statProducts} label={t('statsProducts')} />
            <StatCounter value={statCustomers} label={t('statsCustomers')} />
            <StatCounter value={statYears} label={t('statsYears')} />
            <StatCounter value={statCenters} label={t('statsDelivery')} />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="section-heading">
            <span className="label">{t('products').toUpperCase()}</span>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{t('ourProductRange')}</motion.h2>
          </div>
          {loadingCategories ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {(categories || []).map((cat) => (
                <motion.div key={cat.slug} variants={fadeUp}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="block bg-card rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-accent border border-border transition-all duration-300 group"
                  >
                    <Zap className="w-8 h-8 md:w-10 md:h-10 mx-auto text-accent mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-200" />
                    <div className="font-semibold text-xs md:text-sm text-card-foreground">{cat.name_en}</div>
                    <div className="text-xs text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1">
                      {t('viewAll')} <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-navy circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="section-heading">
            <span className="label text-accent">✦ {t('featured').toUpperCase()}</span>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="!text-primary-foreground">{t('featuredProducts')}</motion.h2>
          </div>
          {loadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {(featured || []).map((product) => (
                <motion.div key={product.id} variants={fadeUp} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="relative h-40 md:h-48 bg-muted flex items-center justify-center">
                    {product.images?.[0] && product.images[0] !== '/placeholder.svg' ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Zap className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground/30" />
                    )}
                    {product.sale_price && (
                      <span className="absolute top-2 left-2 bg-amber text-amber-foreground text-xs font-bold px-2 py-1 rounded">{t('sale')}</span>
                    )}
                    {product.is_featured && (
                      <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">{t('featured')}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-card-foreground truncate">{product.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-accent">Rs. {(product.sale_price || product.price).toLocaleString()}</span>
                      {product.sale_price && <span className="text-sm text-muted-foreground line-through">Rs. {product.price.toLocaleString()}</span>}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-amber hover:bg-amber/90 text-amber-foreground text-xs rounded-lg font-bold hover:scale-105 transition-all duration-200"
                        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, sale_price: product.sale_price, image: product.images?.[0] || '/placeholder.svg' })}
                      >
                        {t('addToCart')}
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs rounded-lg border-accent text-accent hover:bg-accent/10 transition-colors duration-200" asChild>
                        <Link to={`/products/${product.slug}`}>{t('viewDetails')}</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="section-heading">
            <span className="label">{t('about').toUpperCase()}</span>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{t('whyChooseUs')}</motion.h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: ShieldCheck, title: t('isoCertified'), desc: t('isoDesc') },
              { icon: Users, title: t('expertEngineers'), desc: t('engineersDesc') },
              { icon: Wrench, title: t('afterSales'), desc: t('afterSalesDesc') },
              { icon: Truck, title: t('nationwideDelivery'), desc: t('deliveryDesc') },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 hover:border-accent transition-all duration-300">
                <item.icon className="w-10 h-10 mx-auto text-accent mb-4" />
                <h3 className="font-bold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 md:py-16 bg-navy circuit-pattern">
        <div className="container mx-auto px-4">
          <div className="section-heading">
            <span className="label text-accent">★ REVIEWS</span>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="!text-primary-foreground">{t('customerReviews')}</motion.h2>
          </div>
          {loadingReviews ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {(reviews || []).slice(0, 6).map((review) => (
                <motion.div key={review.id} variants={fadeUp} className="bg-card rounded-xl p-6 shadow-lg">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating || 0 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                    ))}
                  </div>
                  <p className="text-sm text-card-foreground mb-4" style={{ lineHeight: 1.7 }}>"{review.message}"</p>
                  <div>
                    <div className="font-semibold text-sm text-card-foreground">{review.customer_name}</div>
                    <div className="text-xs text-muted-foreground">{review.customer_city}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Repair CTA */}
      <section className="bg-amber py-10 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-foreground mb-4">{t('repairCTA')}</h2>
          <Button asChild className="bg-navy hover:bg-navy-light text-primary-foreground rounded-lg px-8 h-12 text-base font-bold hover:scale-105 transition-all duration-200">
            <Link to="/repair-booking">{t('repairCTABtn')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
