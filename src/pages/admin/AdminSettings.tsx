import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";

const tabs = [
  {
    id: "shop", label: "Shop Info",
    keys: ["shop_name", "tagline", "phone", "email", "address", "whatsapp", "google_maps_url"],
  },
  {
    id: "social", label: "Social Media",
    keys: ["facebook_url", "youtube_url", "instagram_url", "tiktok_url"],
  },
  {
    id: "homepage", label: "Homepage",
    keys: ["hero_headline_en", "hero_subtext_en", "stat_products", "stat_customers", "stat_years", "stat_centers"],
  },
  {
    id: "delivery", label: "Delivery",
    keys: ["delivery_charge", "free_delivery_above", "estimated_delivery_days"],
  },
  {
    id: "appearance", label: "Appearance",
    keys: ["primary_color", "accent_color"],
  },
  {
    id: "seo", label: "SEO",
    keys: ["meta_title", "meta_description", "meta_keywords"],
  },
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("settings").select("*");
      const map: Record<string, string> = {};
      (data || []).forEach((s) => { map[s.key] = s.value || ""; });
      setSettings(map);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async (tabKeys: string[]) => {
    setSaving(true);
    try {
      for (const key of tabKeys) {
        const value = settings[key] || "";
        const { data: existing } = await supabase.from("settings").select("id").eq("key", key).maybeSingle();
        if (existing) {
          await supabase.from("settings").update({ value }).eq("id", existing.id);
        } else {
          await supabase.from("settings").insert({ key, value });
        }
      }
      toast({ title: "Settings saved successfully" });
    } catch {
      toast({ title: "Error saving settings", variant: "destructive" });
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12" />)}</div>;

  const formatLabel = (key: string) => key.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Tabs defaultValue="shop">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {tabs.map(t => <TabsTrigger key={t.id} value={t.id} className="text-xs sm:text-sm">{t.label}</TabsTrigger>)}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id}>
            <Card>
              <CardHeader><CardTitle>{tab.label}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {tab.keys.map(key => (
                  <div key={key} className="space-y-1">
                    <Label>{formatLabel(key)}</Label>
                    <Input
                      value={settings[key] || ""}
                      onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                      placeholder={formatLabel(key)}
                    />
                  </div>
                ))}
                <Button onClick={() => handleSave(tab.keys)} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save {tab.label}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminSettings;
