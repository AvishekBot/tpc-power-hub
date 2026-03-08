
-- Admin RLS policies for authenticated users

-- Products: full CRUD
CREATE POLICY "Admin read all products" ON public.products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update products" ON public.products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete products" ON public.products FOR DELETE TO authenticated USING (true);

-- Orders: update and delete
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete orders" ON public.orders FOR DELETE TO authenticated USING (true);

-- Order items: update and delete
CREATE POLICY "Admin update order_items" ON public.order_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete order_items" ON public.order_items FOR DELETE TO authenticated USING (true);

-- Categories: full CRUD
CREATE POLICY "Admin read all categories" ON public.categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update categories" ON public.categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete categories" ON public.categories FOR DELETE TO authenticated USING (true);

-- Ads: full CRUD
CREATE POLICY "Admin read all ads" ON public.ads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert ads" ON public.ads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update ads" ON public.ads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete ads" ON public.ads FOR DELETE TO authenticated USING (true);

-- Announcements: full CRUD
CREATE POLICY "Admin read all announcements" ON public.announcements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert announcements" ON public.announcements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update announcements" ON public.announcements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete announcements" ON public.announcements FOR DELETE TO authenticated USING (true);

-- Reviews: full CRUD
CREATE POLICY "Admin read all reviews" ON public.reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update reviews" ON public.reviews FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete reviews" ON public.reviews FOR DELETE TO authenticated USING (true);

-- FAQs: full CRUD
CREATE POLICY "Admin read all faqs" ON public.faqs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update faqs" ON public.faqs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete faqs" ON public.faqs FOR DELETE TO authenticated USING (true);

-- Blog posts: full CRUD
CREATE POLICY "Admin read all blog_posts" ON public.blog_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert blog_posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update blog_posts" ON public.blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete blog_posts" ON public.blog_posts FOR DELETE TO authenticated USING (true);

-- Contacts: read, update, delete
CREATE POLICY "Admin read contacts" ON public.contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update contacts" ON public.contacts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete contacts" ON public.contacts FOR DELETE TO authenticated USING (true);

-- Repair bookings: read, update, delete
CREATE POLICY "Admin read repair_bookings" ON public.repair_bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update repair_bookings" ON public.repair_bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete repair_bookings" ON public.repair_bookings FOR DELETE TO authenticated USING (true);

-- Settings: insert, update, delete (SELECT already public)
CREATE POLICY "Admin insert settings" ON public.settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update settings" ON public.settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete settings" ON public.settings FOR DELETE TO authenticated USING (true);
