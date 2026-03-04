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

  const faqCategories = [...new Set(sampleFAQs.map((f) => f.category))];

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-primary-foreground">{t('faq')}</motion.h1>
          <div className="mt-4 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t('searchFAQs')} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-0 rounded-lg" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-4">
        {filtered.map((faq) => (
          <div key={faq.id} className="bg-card rounded-lg border overflow-hidden">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-semibold text-sm pr-4">{lang === 'np' ? faq.question_np : faq.question_en}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openId === faq.id ? 'rotate-180' : ''}`} />
            </button>
            {openId === faq.id && (
              <div className="px-4 pb-4 text-sm text-muted-foreground border-t pt-3">
                {lang === 'np' ? faq.answer_np : faq.answer_en}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">{t('noResults')}</p>}

        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-4">{t('stillQuestion')}</p>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-accent-foreground rounded-lg gap-2">
            <a href="https://wa.me/977XXXXXXXXXX" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4" /> Chat on WhatsApp</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
