import { useLanguage } from '@/contexts/LanguageContext';
import { useAnnouncements } from '@/hooks/use-supabase-data';
import { Skeleton } from '@/components/ui/skeleton';

const AnnouncementBar = () => {
  const { lang } = useLanguage();
  const { data: announcements, isLoading } = useAnnouncements();

  if (isLoading) return <div className="rgb-gradient-bg py-2.5"><Skeleton className="h-5 w-3/4 mx-auto" /></div>;
  if (!announcements?.length) return null;

  const text = announcements.map(a => lang === 'np' ? (a.text_np || a.text_en) : a.text_en).join('     •     ');

  return (
    <div className="rgb-gradient-bg py-2.5 overflow-hidden shadow-lg relative">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-sm font-bold mx-8 tracking-wide text-white drop-shadow-md">{text}     •     {text}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
