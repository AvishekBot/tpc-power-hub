import { motion } from 'framer-motion';
import { ShieldCheck, Users, Wrench, Target, Eye, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-background transition-colors duration-300">
      {/* Hero — always dark */}
      <section className="bg-navy circuit-pattern py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-foreground">
            {t('about')}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 text-primary-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            Powering Nepal with reliable, efficient, and affordable electrical solutions since 2014.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-6 text-foreground">{t('companyStory')}</h2>
          <p className="text-muted-foreground mb-4" style={{ lineHeight: 1.7 }}>
            T.P.C Power Solutions was founded with a vision to provide world-class power solutions to homes and industries across Nepal. Starting from a small workshop in Kathmandu, we have grown to become one of Nepal's most trusted names in the electrical industry.
          </p>
          <p className="text-muted-foreground" style={{ lineHeight: 1.7 }}>
            Today, we manufacture and supply a comprehensive range of power products including UPS systems, servo stabilizers, transformers, inverters, VFD drives, solar solutions, and much more. Our ISO 9001:2015 certification is a testament to our commitment to quality.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 bg-muted transition-colors duration-300">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-card rounded-xl p-8 border border-border transition-colors duration-300">
            <Target className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-extrabold mb-3 text-foreground">Our Mission</h3>
            <p className="text-muted-foreground" style={{ lineHeight: 1.7 }}>To deliver reliable, innovative, and cost-effective power solutions that empower every home and business in Nepal.</p>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border transition-colors duration-300">
            <Eye className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-extrabold mb-3 text-foreground">Our Vision</h3>
            <p className="text-muted-foreground" style={{ lineHeight: 1.7 }}>To be South Asia's leading power solutions provider, driving sustainable development through technology and innovation.</p>
          </div>
        </div>
      </section>

      {/* ISO Badge + Stats */}
      <section className="py-12 md:py-16 container mx-auto px-4 text-center">
        <Award className="w-16 h-16 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-extrabold mb-2 text-foreground">{t('isoCertified')}</h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">{t('isoDesc')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { val: t('stats500'), label: t('statsProducts') },
            { val: t('stats1000'), label: t('statsCustomers') },
            { val: t('stats10'), label: t('statsYears') },
            { val: t('statsNationwide'), label: t('statsDelivery') },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-xl p-6 border border-border transition-colors duration-300">
              <div className="text-2xl font-extrabold text-accent">{s.val}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
