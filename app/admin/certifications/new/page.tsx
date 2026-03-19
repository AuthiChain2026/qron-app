export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import NewCertificationForm from './NewCertificationForm';

export default async function NewCertificationPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, manufacturer, model_number')
    .order('name', { ascending: true });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <NewCertificationForm products={products || []} fetchError={error?.message} />
    </div>
  );
}
