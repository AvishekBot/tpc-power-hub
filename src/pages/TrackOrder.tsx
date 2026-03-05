import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, CheckCircle, Truck, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TrackOrder = () => {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">{t('trackOrder')}</motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="bg-card rounded-xl p-6 border border-border transition-colors duration-300">
          <p className="text-muted-foreground text-sm mb-4">{t('enterOrderId')}</p>
          <div className="flex gap-2">
            <Input placeholder="TPC-XXXXX" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="min-h-[48px]" />
            <Button onClick={() => setSearched(true)} className="bg-accent text-accent-foreground rounded-lg shrink-0 min-h-[48px]">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {searched && (
          <div className="mt-8 bg-card rounded-xl p-6 border border-border text-center transition-colors duration-300">
            <p className="text-muted-foreground">Order not found. Please check the ID and try again.</p>
            <Button asChild variant="outline" className="mt-4 gap-2 border-green-500 text-green-600 dark:text-green-400 min-h-[48px]">
              <a href="https://wa.me/977XXXXXXXXXX?text=Hi, I need help tracking my order" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" /> Contact Support
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
