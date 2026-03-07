import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/hooks/use-supabase-data';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const { data: settings } = useSettings();
  const phone = settings?.whatsapp || '977XXXXXXXXXX';

  return (
    <a
      href={`https://wa.me/${phone}?text=Hello%20TPC%20Power%20Solutions!`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      <span className="bg-card text-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
        {t('chatNow')}
      </span>
      <div className="relative flex items-center justify-center">
        <span className="absolute w-16 h-16 rounded-full bg-[#25D366]/40 animate-ping" />
        <span className="absolute w-14 h-14 rounded-full bg-[#25D366]/20 animate-pulse" />
        <div className="relative bg-[#25D366] hover:scale-110 transition-transform duration-200 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center">
          <MessageCircle className="w-7 h-7" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
