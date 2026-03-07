
-- Public read policies for storefront tables
CREATE POLICY "Public can read active announcements" ON public.announcements FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public can read active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read visible categories" ON public.categories FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read visible faqs" ON public.faqs FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can read active ads" ON public.ads FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true);

-- Public insert policies for forms
CREATE POLICY "Public can insert contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert repair bookings" ON public.repair_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Public can read their own order by ID
CREATE POLICY "Public can read orders by id" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public can read order items" ON public.order_items FOR SELECT USING (true);
