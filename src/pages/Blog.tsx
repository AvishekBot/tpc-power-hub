import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
  const { t } = useLanguage();
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('is_published', true).order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">{t('blog')}</motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {(posts || []).map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-40 md:h-48 bg-muted flex items-center justify-center">
                  {post.thumbnail_url ? <img src={post.thumbnail_url} alt={post.title_en} className="w-full h-full object-cover" /> : <span className="text-4xl">📝</span>}
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-accent">{post.category}</span>
                  <h3 className="font-extrabold mt-1 mb-2 text-foreground">{post.title_en}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{(post.content || '').replace(/<[^>]*>/g, '').slice(0, 120)}...</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
                    <Link to={`/blog/${post.slug}`} className="text-sm text-accent font-semibold hover:underline">{t('readMore')} →</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {!isLoading && (!posts || posts.length === 0) && (
          <p className="text-center text-muted-foreground py-12">No blog posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
