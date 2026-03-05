import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Facebook, MessageCircle, Copy } from 'lucide-react';
import { sampleBlogPosts } from '@/lib/sampleData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const post = sampleBlogPosts.find((p) => p.slug === slug);

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
          <span className="text-foreground truncate">{post.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-4 gap-8">
        <article className="lg:col-span-3">
          <span className="text-xs font-bold text-accent">{post.category}</span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mt-2 mb-4 text-foreground">{post.title}</h1>
          <div className="text-sm text-muted-foreground mb-6">{new Date(post.created_at).toLocaleDateString()}</div>
          <div className="prose max-w-none text-foreground dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-8 flex gap-3 items-center">
            <span className="text-sm font-semibold text-foreground">Share:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:bg-accent/10 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href={`https://wa.me/?text=${post.title} ${window.location.href}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"><MessageCircle className="w-4 h-4" /></a>
            <button onClick={copyLink} className="p-2 bg-muted rounded-lg hover:bg-accent/10 transition-colors"><Copy className="w-4 h-4" /></button>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="bg-card rounded-xl p-6 border border-border sticky top-24 transition-colors duration-300">
            <h3 className="font-bold mb-3 text-foreground">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our experts are available to help you choose the right power solution.</p>
            <Button asChild className="w-full bg-[#25D366] hover:bg-[#1ea855] text-white rounded-lg gap-2">
              <a href="https://wa.me/977XXXXXXXXXX" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4" /> {t('chatNow')}</a>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;
