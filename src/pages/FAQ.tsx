import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleFAQs } from '@/lib/sampleData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = sampleFAQs.filter((f) => {
    if (!search) return f.is_visible;
    const q = search.toLowerCase();
    const question = lang === 'np' ? f.question_np : f.question_en;
    return f.is_visible && question.toLowerCase().includes(q);
  });

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">{t('faq')}</motion.h1>
          <div className="mt-4 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t('searchFAQs')} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-0 rounded-lg min-h-[48px]" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-3">
        {filtered.map((faq) => (
          <div key={faq.id} className="bg-card rounded-xl border border-border overflow-hidden transition-colors duration-300">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-4 text-left min-h-[48px]"
            >
              <span className="font-semibold text-sm pr-4 text-foreground">{lang === 'np' ? faq.question_np : faq.question_en}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 text-muted-foreground ${openId === faq.id ? 'rotate-180' : ''}`} />
            </button>
            {openId === faq.id && (
              <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3" style={{ lineHeight: 1.7 }}>
                {lang === 'np' ? faq.answer_np : faq.answer_en}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">{t('noResults')}</p>}

        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-4">{t('stillQuestion')}</p>
          <Button asChild className="bg-[#25D366] hover:bg-[#1ea855] text-white rounded-lg gap-2 min-h-[48px]">
            <a href="https://wa.me/977XXXXXXXXXX" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4" /> Chat on WhatsApp</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
