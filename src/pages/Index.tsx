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
    <div className="text-3xl md:text-4xl font-extrabold text-accent" style={{ animation: 'counter-glow 3s ease-in-out infinite' }}>{value}</div>
    <div className="text-sm text-primary-foreground/70 mt-1">{label}</div>
  </motion.div>
);

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

const categoryGlowColors: Record<string, string> = {
  'ups-systems': 'rgba(59,130,246,0.5)',
  'home-inverters': 'rgba(34,197,94,0.5)',
  'solar-solutions': 'rgba(250,204,21,0.5)',
  'servo-stabilizers': 'rgba(168,85,247,0.5)',
  'batteries': 'rgba(239,68,68,0.5)',
  'transformers': 'rgba(6,182,212,0.5)',
  'wiring': 'rgba(249,115,22,0.5)',
  'generators': 'rgba(239,68,68,0.5)',
  'led-lights': 'rgba(250,204,21,0.5)',
  'panel-boards': 'rgba(99,102,241,0.5)',
  'cables': 'rgba(34,197,94,0.5)',
  'switchgear': 'rgba(236,72,153,0.5)',
};

// Particles component
const Particles = () => (
  <div className="particles-container">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          bottom: '-5px',
          animationDuration: `${6 + Math.random() * 8}s`,
          animationDelay: `${Math.random() * 5}s`,
          width: `${2 + Math.random() * 3}px`,
          height: `${2 + Math.random() * 3}px`,
          opacity: 0.3 + Math.random() * 0.4,
        }}
      />
    ))}
  </div>
);

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
        <Particles />
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
          {/* Animated circuit lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <motion.path d="M0,200 Q200,100 400,200 T800,200" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="1" strokeDasharray="10 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} />
            <motion.path d="M100,400 Q300,300 500,400 T900,350" fill="none" stroke="rgba(160,64,255,0.04)" strokeWidth="1" strokeDasharray="8 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }} />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--navy))]/50" />
        </div>

        <div className="container mx-auto px-4 py-14 sm:py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight">
                <span className="rgb-gradient-text">{heroHeadline}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 text-primary-foreground/70 text-base md:text-lg max-w-lg" style={{ lineHeight: 1.7 }}>
                {heroSubtext}
              </motion.p>
              {/* Trust badges */}
              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-4">
                {[
                  { icon: ShieldCheck, label: 'ISO Certified' },
                  { icon: Users, label: '1000+ Customers' },
                  { icon: Truck, label: 'Nationwide Delivery' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-primary-foreground/60">
                    <badge.icon className="w-4 h-4 text-accent" style={{ filter: 'drop-shadow(0 0 6px rgba(37,99,235,0.6))' }} />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4">
                <Button asChild className="relative bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg px-8 h-12 text-base font-bold hover:scale-105 transition-all duration-200 shadow-lg shadow-accent/25 rgb-border rgb-hover-glow">
                  <Link to="/products">{t('browseProducts')}</Link>
                </Button>
                <Button asChild variant="outline" className="border-amber text-amber hover:bg-amber/10 rounded-lg px-8 h-12 text-base font-bold hover:scale-105 transition-all duration-200 rgb-hover-glow">
                  <Link to="/contact">{t('getQuote')}</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="hidden md:flex justify-center">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full" style={{ animation: 'rgb-glow-pulse 6s linear infinite' }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-[-10px] border border-dashed border-accent/20 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} className="absolute inset-[-25px] rounded-full rgb-border" style={{ borderRadius: '9999px' }} />
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
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-gradient-heading">{t('ourProductRange')}</motion.h2>
          </div>
          {loadingCategories ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {(categories || []).map((cat) => {
                const Icon = categoryIconMap[cat.slug] || Zap;
                const glowColor = categoryGlowColors[cat.slug] || 'rgba(37,99,235,0.5)';
                return (
                  <motion.div key={cat.slug} variants={fadeUp}>
                    <Link
                      to={`/products?category=${cat.slug}`}
                      className="block glass-card rounded-xl p-4 md:p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group rgb-border dark:bg-opacity-60 bg-card dark:glass-card"
                    >
                      <Icon
                        className="w-8 h-8 md:w-10 md:h-10 mx-auto text-accent mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-200"
                        style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
                      />
                      <div className="font-semibold text-xs md:text-sm text-card-foreground dark:text-white/90">{cat.name_en}</div>
                      <div className="text-xs text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1">
                        {t('viewAll')} <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rgb-border rounded-lg px-8 h-11 font-bold rgb-hover-glow">
              <Link to="/products">{t('viewAll')} {t('products')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-navy circuit-pattern relative">
        <Particles />
        <div className="container mx-auto px-4 relative z-10">
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
                <motion.div key={product.id} variants={fadeUp} className="glass-card rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 group rgb-hover-glow">
                  <div className="relative h-40 md:h-48 bg-white/5 flex items-center justify-center overflow-hidden">
                    {product.images?.[0] && product.images[0] !== '/placeholder.svg' ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Zap className="w-12 h-12 md:w-16 md:h-16 text-white/20" />
                    )}
                    {product.sale_price && (
                      <span className="absolute top-2 left-2 rgb-gradient-bg text-white text-xs font-bold px-2 py-1 rounded">{t('sale')}</span>
                    )}
                    {product.is_featured && !product.sale_price && (
                      <span className="absolute top-2 right-2 rgb-gradient-bg text-white text-xs font-bold px-2 py-1 rounded">{t('featured')}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-white/90 truncate">{product.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-accent" style={{ textShadow: '0 0 10px rgba(37,99,235,0.4)' }}>Rs. {(product.sale_price || product.price).toLocaleString()}</span>
                      {product.sale_price && <span className="text-sm text-white/40 line-through">Rs. {product.price.toLocaleString()}</span>}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-amber hover:bg-amber/90 text-amber-foreground text-xs rounded-lg font-bold hover:scale-105 transition-all duration-200 rgb-hover-glow"
                        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, sale_price: product.sale_price, image: product.images?.[0] || '/placeholder.svg' })}
                      >
                        {t('addToCart')}
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs rounded-lg border-accent/50 text-accent hover:bg-accent/10 transition-colors duration-200" asChild>
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
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-gradient-heading">{t('whyChooseUs')}</motion.h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: ShieldCheck, title: t('isoCertified'), desc: t('isoDesc'), glow: 'rgba(34,197,94,0.5)' },
              { icon: Users, title: t('expertEngineers'), desc: t('engineersDesc'), glow: 'rgba(59,130,246,0.5)' },
              { icon: Wrench, title: t('afterSales'), desc: t('afterSalesDesc'), glow: 'rgba(250,204,21,0.5)' },
              { icon: Truck, title: t('nationwideDelivery'), desc: t('deliveryDesc'), glow: 'rgba(168,85,247,0.5)' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rgb-hover-glow group">
                <item.icon
                  className="w-10 h-10 mx-auto text-accent mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{ filter: `drop-shadow(0 0 10px ${item.glow})` }}
                />
                <h3 className="font-bold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 md:py-16 bg-navy circuit-pattern relative">
        <Particles />
        <div className="container mx-auto px-4 relative z-10">
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
                <motion.div key={review.id} variants={fadeUp} className="glass-card rounded-xl p-6 rgb-hover-glow">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating || 0 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber text-amber" style={{ filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.6))' }} />
                    ))}
                  </div>
                  <p className="text-sm text-white/80 mb-4" style={{ lineHeight: 1.7 }}>"{review.message}"</p>
                  <div>
                    <div className="font-semibold text-sm text-white/90">{review.customer_name}</div>
                    <div className="text-xs text-white/50">{review.customer_city}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Repair CTA */}
      <section className="rgb-gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="container mx-auto px-4 py-10 md:py-14 text-center relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 drop-shadow-lg">{t('repairCTA')}</h2>
          <Button asChild className="bg-white/20 hover:bg-white/30 backdrop-blur text-white border border-white/30 rounded-lg px-8 h-12 text-base font-bold hover:scale-105 transition-all duration-200" style={{ animation: 'rgb-glow-pulse 4s linear infinite' }}>
            <Link to="/repair-booking">{t('repairCTABtn')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
