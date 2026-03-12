import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Menu, X, ChevronDown, Sun, Moon, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCartStore } from '@/stores/cartStore';
import { useCategories, useSettings } from '@/hooks/use-supabase-data';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: categories } = useCategories();
  const { data: settings } = useSettings();
  const whatsapp = settings?.whatsapp || '977XXXXXXXXXX';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/products', label: t('products'), hasDropdown: true },
    { to: '/services', label: t('services') },
    { to: '/about', label: t('about') },
    { to: '/blog', label: t('blog') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 glass-dark border-b-0 ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>
      {/* RGB bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] rgb-gradient-bg opacity-70" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="text-2xl font-extrabold rgb-gradient-text tracking-tighter">TPC</span>
            <span className="hidden sm:inline font-bold text-sm whitespace-nowrap text-primary-foreground/90 tracking-tight">Power Solutions</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.to} className="relative group">
                <Link
                  to={link.to}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 rgb-underline ${
                    location.pathname === link.to ? 'text-accent' : 'text-primary-foreground/80 hover:text-primary-foreground'
                  }`}
                  onMouseEnter={() => link.hasDropdown && setProductsOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setProductsOpen(false)}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </Link>
                {link.hasDropdown && productsOpen && (
                  <div
                    className="absolute top-full left-0 glass-dark shadow-2xl rounded-xl border border-white/10 p-4 grid grid-cols-3 gap-2 w-[480px] z-50"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    {(categories || []).map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/10 text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                      >
                        <Zap className="w-4 h-4 text-accent" />
                        {cat.name_en}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-all duration-200 rgb-hover-glow" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="hidden sm:flex bg-white/10 rounded-full p-0.5 text-xs font-semibold">
              <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-full transition-all duration-200 ${lang === 'en' ? 'bg-accent text-accent-foreground' : 'text-primary-foreground/60 hover:text-primary-foreground'}`}>EN</button>
              <button onClick={() => setLang('np')} className={`px-2.5 py-1 rounded-full transition-all duration-200 ${lang === 'np' ? 'bg-accent text-accent-foreground' : 'text-primary-foreground/60 hover:text-primary-foreground'}`}>NP</button>
            </div>

            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hidden sm:block p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-all duration-200">
              <MessageCircle className="w-5 h-5" />
            </a>

            <Link to="/cart" className="p-2 relative text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 rgb-hover-glow rounded-lg">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber text-amber-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>
              )}
            </Link>

            <button className="lg:hidden p-2 text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-white/10">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block px-4 py-3 text-sm font-medium text-primary-foreground/80 hover:text-accent hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/faq" className="block px-4 py-3 text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors duration-200" onClick={() => setMobileOpen(false)}>{t('faq')}</Link>
            <Link to="/track-order" className="block px-4 py-3 text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors duration-200" onClick={() => setMobileOpen(false)}>{t('trackOrder')}</Link>
            <div className="px-4 pt-3 flex items-center gap-3 border-t border-white/10 mt-2">
              <div className="flex bg-white/10 rounded-full p-0.5 text-xs font-semibold">
                <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-accent text-accent-foreground' : 'text-primary-foreground/60'}`}>EN</button>
                <button onClick={() => setLang('np')} className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'np' ? 'bg-accent text-accent-foreground' : 'text-primary-foreground/60'}`}>NP</button>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-lg text-primary-foreground hover:bg-white/10 transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 text-green-400">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
