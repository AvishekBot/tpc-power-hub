import { motion } from 'framer-motion';
import { Factory, Wrench, FileCheck, Settings, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  { icon: Factory, title: 'Product Manufacturing', desc: 'Custom manufacturing of transformers, stabilizers, UPS systems and more to your exact specifications.' },
  { icon: Wrench, title: 'Repair & Maintenance', desc: 'Expert repair services for all types of electrical equipment. Quick diagnosis and fixes.' },
  { icon: FileCheck, title: 'Annual Maintenance Contract (AMC)', desc: 'Comprehensive AMC plans with regular servicing, priority support, and replacement parts.' },
  { icon: Settings, title: 'On-site Installation & Commissioning', desc: 'Professional installation and commissioning of all our products.' },
];

const Services = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-background transition-colors duration-300">
      <section className="bg-navy circuit-pattern py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">{t('ourServices')}</motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid sm:grid-cols-2 gap-4 md:gap-6">
        {services.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <s.icon className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-lg font-extrabold mb-2 text-foreground">{s.title}</h3>
            <p className="text-muted-foreground text-sm mb-4" style={{ lineHeight: 1.7 }}>{s.desc}</p>
            <Button variant="outline" className="border-accent text-accent rounded-lg gap-2 hover:scale-105 transition-all duration-200" asChild>
              <a href={`https://wa.me/977XXXXXXXXXX?text=Hi, I'm interested in ${s.title}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" /> Get Quote
              </a>
            </Button>
          </motion.div>
        ))}
      </div>

      <section className="bg-amber py-10 md:py-12 text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-amber-foreground mb-4">{t('repairCTA')}</h2>
        <Button asChild className="bg-navy hover:bg-navy-light text-primary-foreground rounded-lg px-8 h-12 font-bold hover:scale-105 transition-all duration-200">
          <Link to="/repair-booking">{t('bookRepair')}</Link>
        </Button>
      </section>
    </div>
  );
};

export default Services;
