import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/lib/categories';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div>
            <h3 className="text-xl font-extrabold mb-2">T.P.C Power Solutions</h3>
            <p className="text-primary-foreground/70 text-sm mb-4">{t('footerTagline')}</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{t('quickLinks')}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <Link to="/" className="block hover:text-accent transition-colors">{t('home')}</Link>
              <Link to="/about" className="block hover:text-accent transition-colors">{t('about')}</Link>
              <Link to="/services" className="block hover:text-accent transition-colors">{t('services')}</Link>
              <Link to="/blog" className="block hover:text-accent transition-colors">{t('blog')}</Link>
              <Link to="/faq" className="block hover:text-accent transition-colors">{t('faq')}</Link>
              <Link to="/track-order" className="block hover:text-accent transition-colors">{t('trackOrder')}</Link>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-bold mb-4">{t('productCategories')}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              {categories.slice(0, 6).map((cat) => (
                <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="block hover:text-accent transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{t('contactInfo')}</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+977 XXXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@tpcpower.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} T.P.C Power Solutions. All rights reserved.</p>
          <p className="mt-1">{t('proudlyNepal')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
