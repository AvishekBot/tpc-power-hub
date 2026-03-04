import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) { toast({ title: 'Please fill required fields', variant: 'destructive' }); return; }
    toast({ title: 'Message sent successfully!' });
    setForm({ name: '', email: '', phone: '', subject: 'general', message: '' });
  };

  return (
    <div className="bg-background">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-primary-foreground">{t('contact')}</motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Name *" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            <Input placeholder="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <select value={form.subject} onChange={(e) => update('subject', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm bg-card">
            <option value="general">General Inquiry</option>
            <option value="product">Product Inquiry</option>
            <option value="repair">Repair Request</option>
            <option value="quote">Get a Quote</option>
          </select>
          <textarea placeholder="Message *" value={form.message} onChange={(e) => update('message', e.target.value)} required className="w-full border rounded-lg px-3 py-2 text-sm bg-card min-h-[120px]" />
          <Button type="submit" className="bg-accent text-accent-foreground rounded-lg h-12 px-8 font-bold">{t('sendMessage')}</Button>
        </form>

        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 border space-y-4">
            <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" /><div><div className="font-semibold">Address</div><div className="text-sm text-muted-foreground">Kathmandu, Nepal</div></div></div>
            <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" /><div><div className="font-semibold">Phone</div><div className="text-sm text-muted-foreground">+977 XXXXXXXXXX</div></div></div>
            <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" /><div><div className="font-semibold">Email</div><div className="text-sm text-muted-foreground">info@tpcpower.com</div></div></div>
          </div>
          <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-accent-foreground rounded-lg h-12 font-bold gap-2">
            <a href="https://wa.me/977XXXXXXXXXX" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5" /> Chat on WhatsApp</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
