import { createClient } from '@/lib/supabase/server';
import ReferralsList from '@/features/dashboard/components/ReferralsList';

export default async function ReferralsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get owner data
  const { data: owner } = await supabase
    .from('owners')
    .select('id')
    .eq('user_id', user?.id)
    .single();

  // Get all referrals
  const { data: referrals } = await supabase
    .from('referrals')
    .select('*')
    .eq('owner_id', owner?.id)
    .order('created_at', { ascending: false });

  return <ReferralsList referrals={referrals || []} />;
}
