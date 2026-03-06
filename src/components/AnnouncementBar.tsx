import { useLanguage } from '@/contexts/LanguageContext';
import { sampleAnnouncements } from '@/lib/sampleData';

const AnnouncementBar = () => {
  const { lang } = useLanguage();
  const announcements = sampleAnnouncements.filter(a => a.is_active);
  const text = announcements.map(a => lang === 'np' ? a.text_np : a.text_en).join('     •     ');

  return (
    <div className="bg-amber text-amber-foreground py-2.5 overflow-hidden shadow-sm">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-sm font-bold mx-8 tracking-wide">{text}     •     {text}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
