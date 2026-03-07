import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/hooks/use-supabase-data';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { data: settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const address = settings?.address || 'Kathmandu, Nepal';
  const phone = settings?.phone || '+977 XXXXXXXXXX';
  const email = settings?.email || 'info@tpcpower.com';
  const whatsapp = settings?.whatsapp || '977XXXXXXXXXX';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) { toast({ title: 'Please fill required fields', variant: 'destructive' }); return; }
    setSubmitting(true);
    const { error } = await supabase.from('contacts').insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      subject: form.subject,
      message: form.message,
    });
    setSubmitting(false);
    if (error) { toast({ title: 'Failed to send message', variant: 'destructive' }); return; }
    toast({ title: 'Message sent successfully!' });
    setForm({ name: '', email: '', phone: '', subject: 'general', message: '' });
  };

  return (
    <div className="bg-background transition-colors duration-300">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">{t('contact')}</motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Name *" value={form.name} onChange={(e) => update('name', e.target.value)} required className="min-h-[48px]" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="min-h-[48px]" />
            <Input placeholder="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="min-h-[48px]" />
          </div>
          <select value={form.subject} onChange={(e) => update('subject', e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground min-h-[48px]">
            <option value="general">General Inquiry</option>
            <option value="product">Product Inquiry</option>
            <option value="repair">Repair Request</option>
            <option value="quote">Get a Quote</option>
          </select>
          <textarea placeholder="Message *" value={form.message} onChange={(e) => update('message', e.target.value)} required className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground min-h-[120px]" />
          <Button type="submit" disabled={submitting} className="bg-accent text-accent-foreground rounded-lg h-12 px-8 font-bold hover:scale-105 transition-all duration-200">
            {submitting ? 'Sending...' : t('sendMessage')}
          </Button>
        </form>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border space-y-4 transition-colors duration-300">
            <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" /><div><div className="font-semibold text-foreground">Address</div><div className="text-sm text-muted-foreground">{address}</div></div></div>
            <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" /><div><div className="font-semibold text-foreground">Phone</div><div className="text-sm text-muted-foreground">{phone}</div></div></div>
            <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" /><div><div className="font-semibold text-foreground">Email</div><div className="text-sm text-muted-foreground">{email}</div></div></div>
          </div>
          <Button asChild className="w-full bg-[#25D366] hover:bg-[#1ea855] text-white rounded-lg h-12 font-bold gap-2">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5" /> Chat on WhatsApp</a>
          </Button>
          <a href={`tel:${phone}`} className="block md:hidden">
            <Button className="w-full bg-accent text-accent-foreground rounded-lg h-12 font-bold gap-2">
              <Phone className="w-5 h-5" /> Call Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
