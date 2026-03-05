import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const RepairBooking = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', email: '', productType: '', brandModel: '', problem: '', date: '', address: '' });
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.productType || !form.problem) {
      toast({ title: 'Please fill required fields', variant: 'destructive' }); return;
    }
    toast({ title: 'Repair booking submitted successfully!' });
    window.open(`https://wa.me/977XXXXXXXXXX?text=Repair Request: ${form.productType} - ${form.problem}`, '_blank');
    setForm({ name: '', phone: '', email: '', productType: '', brandModel: '', problem: '', date: '', address: '' });
  };

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">{t('bookRepair')}</motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border space-y-4 transition-colors duration-300">
          <Input placeholder="Customer Name *" value={form.name} onChange={(e) => update('name', e.target.value)} required className="min-h-[48px]" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Phone *" value={form.phone} onChange={(e) => update('phone', e.target.value)} required className="min-h-[48px]" />
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="min-h-[48px]" />
          </div>
          <select value={form.productType} onChange={(e) => update('productType', e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground min-h-[48px]" required>
            <option value="">Product Type *</option>
            <option value="UPS">UPS</option>
            <option value="Stabilizer">Stabilizer</option>
            <option value="Transformer">Transformer</option>
            <option value="Inverter">Inverter</option>
            <option value="Drive">Drive</option>
            <option value="Other">Other</option>
          </select>
          <Input placeholder="Brand & Model" value={form.brandModel} onChange={(e) => update('brandModel', e.target.value)} className="min-h-[48px]" />
          <textarea placeholder="Problem Description *" value={form.problem} onChange={(e) => update('problem', e.target.value)} required className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground min-h-[100px]" />
          <Input type="date" placeholder="Preferred Service Date" value={form.date} onChange={(e) => update('date', e.target.value)} className="min-h-[48px]" />
          <Input placeholder="Location / Address" value={form.address} onChange={(e) => update('address', e.target.value)} className="min-h-[48px]" />
          <Button type="submit" className="w-full bg-accent text-accent-foreground rounded-lg h-12 font-bold hover:scale-105 transition-all duration-200">{t('submitRequest')}</Button>
        </form>
      </div>
    </div>
  );
};

export default RepairBooking;
