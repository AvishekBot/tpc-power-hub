import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsAppButton = () => {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/977XXXXXXXXXX?text=Hello%20TPC%20Power%20Solutions!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group"
    >
      <span className="bg-card text-foreground text-sm font-medium px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {t('chatNow')}
      </span>
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse-ring" />
        <div className="relative bg-green-500 hover:bg-green-600 transition-colors text-accent-foreground p-3.5 rounded-full shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
