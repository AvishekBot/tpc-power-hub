import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Phone, Mail, MapPin, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings, useCategories } from '@/hooks/use-supabase-data';

const Footer = () => {
  const { t } = useLanguage();
  const { data: settings } = useSettings();
  const { data: categories } = useCategories();

  const shopName = settings?.shop_name || 'T.P.C Power Solutions';
  const address = settings?.address || 'Kathmandu, Nepal';
  const phone = settings?.phone || '+977 XXXXXXXXXX';
  const email = settings?.email || 'info@tpcpower.com';
  const facebookUrl = settings?.facebook_url || '#';
  const youtubeUrl = settings?.youtube_url || '#';
  const instagramUrl = settings?.instagram_url || '#';

  return (
    <footer className="bg-navy circuit-pattern text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1 min-w-[260px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-accent rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-extrabold whitespace-nowrap">{shopName}</h3>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-4">{t('footerTagline')}</p>
            <div className="flex gap-3">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors duration-200"><Facebook className="w-4 h-4" /></a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors duration-200"><Youtube className="w-4 h-4" /></a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors duration-200"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('quickLinks')}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <Link to="/" className="block hover:text-accent transition-colors duration-200">{t('home')}</Link>
              <Link to="/about" className="block hover:text-accent transition-colors duration-200">{t('about')}</Link>
              <Link to="/services" className="block hover:text-accent transition-colors duration-200">{t('services')}</Link>
              <Link to="/blog" className="block hover:text-accent transition-colors duration-200">{t('blog')}</Link>
              <Link to="/faq" className="block hover:text-accent transition-colors duration-200">{t('faq')}</Link>
              <Link to="/track-order" className="block hover:text-accent transition-colors duration-200">{t('trackOrder')}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('productCategories')}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              {(categories || []).slice(0, 6).map((cat) => (
                <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="block hover:text-accent transition-colors duration-200">
                  {cat.name_en}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('contactInfo')}</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>{address}</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /><span>{phone}</span></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><span>{email}</span></div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} {shopName}. All rights reserved.</p>
          <p className="mt-1">{t('proudlyNepal')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
