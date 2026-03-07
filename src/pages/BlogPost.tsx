import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Facebook, MessageCircle, Copy } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/hooks/use-supabase-data';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { data: settings } = useSettings();
  const whatsapp = settings?.whatsapp || '977XXXXXXXXXX';

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog_post', slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-3xl space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!post) return <div className="min-h-[60vh] flex items-center justify-center bg-background"><p className="text-muted-foreground">Post not found</p></div>;

  const copyLink = () => { navigator.clipboard.writeText(window.location.href); toast({ title: 'Link copied!' }); };

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors">{t('home')}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-accent transition-colors">{t('blog')}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate">{post.title_en}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-4 gap-8">
        <article className="lg:col-span-3">
          <span className="text-xs font-bold text-accent">{post.category}</span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mt-2 mb-4 text-foreground">{post.title_en}</h1>
          <div className="text-sm text-muted-foreground mb-6">{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</div>
          <div className="prose max-w-none text-foreground dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content || '' }} />

          <div className="mt-8 flex gap-3 items-center">
            <span className="text-sm font-semibold text-foreground">Share:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:bg-accent/10 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href={`https://wa.me/?text=${encodeURIComponent(post.title_en + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"><MessageCircle className="w-4 h-4" /></a>
            <button onClick={copyLink} className="p-2 bg-muted rounded-lg hover:bg-accent/10 transition-colors"><Copy className="w-4 h-4" /></button>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="bg-card rounded-xl p-6 border border-border sticky top-24 transition-colors duration-300">
            <h3 className="font-bold mb-3 text-foreground">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our experts are available to help you choose the right power solution.</p>
            <Button asChild className="w-full bg-[#25D366] hover:bg-[#1ea855] text-white rounded-lg gap-2">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4" /> {t('chatNow')}</a>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;
