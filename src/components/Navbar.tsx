import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCartStore } from '@/stores/cartStore';
import { categories } from '@/lib/categories';
import logo from '@/assets/logo.jpg';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/products', label: t('products'), hasDropdown: true },
    { to: '/services', label: t('services') },
    { to: '/about', label: t('about') },
    { to: '/blog', label: t('blog') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <nav className="bg-card shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-white dark:bg-transparent rounded-lg p-0.5">
              <img src={logo} alt="TPC Logo" className="h-12 w-12 rounded-lg object-contain" />
            </div>
            <span className="hidden sm:inline font-extrabold text-lg whitespace-nowrap text-foreground transition-colors duration-300">T.P.C Power Solutions</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.to} className="relative group">
                <Link
                  to={link.to}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1 ${
                    location.pathname === link.to ? 'text-accent bg-accent/10' : 'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                  onMouseEnter={() => link.hasDropdown && setProductsOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setProductsOpen(false)}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </Link>
                {link.hasDropdown && productsOpen && (
                  <div
                    className="absolute top-full left-0 bg-card shadow-xl rounded-xl border border-border p-4 grid grid-cols-3 gap-2 w-[480px] z-50 transition-colors duration-300"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/10 text-sm text-foreground hover:text-accent transition-colors duration-200"
                      >
                        <cat.icon className="w-4 h-4 text-accent" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-foreground hover:bg-accent/10 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Toggle */}
            <div className="hidden sm:flex bg-muted rounded-full p-0.5 text-xs font-semibold transition-colors duration-300">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${lang === 'en' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('np')}
                className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${lang === 'np' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                NP
              </button>
            </div>

            <a href="https://wa.me/977XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="hidden sm:block p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200">
              <MessageCircle className="w-5 h-5" />
            </a>

            <Link to="/cart" className="p-2 relative text-foreground hover:text-accent transition-colors duration-200">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber text-amber-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-border transition-colors duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/faq" className="block px-4 py-3 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200" onClick={() => setMobileOpen(false)}>
              {t('faq')}
            </Link>
            <Link to="/track-order" className="block px-4 py-3 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200" onClick={() => setMobileOpen(false)}>
              {t('trackOrder')}
            </Link>
            <div className="px-4 pt-3 flex items-center gap-3 border-t border-border mt-2">
              {/* Mobile Language Toggle */}
              <div className="flex bg-muted rounded-full p-0.5 text-xs font-semibold">
                <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>EN</button>
                <button onClick={() => setLang('np')} className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'np' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>NP</button>
              </div>
              {/* Mobile Theme Toggle */}
              <button onClick={toggleTheme} className="p-2 rounded-lg text-foreground hover:bg-accent/10 transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="https://wa.me/977XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="p-2 text-green-600">
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
