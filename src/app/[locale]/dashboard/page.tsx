import { createClient } from '@/lib/supabase/server';
import DashboardOverview from '@/features/dashboard/components/DashboardOverview';

export default async function DashboardPage({
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
    .select('*')
    .eq('user_id', user?.id)
    .single();

  // Get referrals stats
  const { data: referrals, count: totalReferrals } = await supabase
    .from('referrals')
    .select('*', { count: 'exact' })
    .eq('owner_id', owner?.id);

  const successfulReferrals = referrals?.filter(
    (r) => r.stage === 'closed_won'
  ).length || 0;

  // Get rewards stats
  const { data: rewards } = await supabase
    .from('rewards')
    .select('amount')
    .eq('owner_id', owner?.id)
    .eq('status', 'issued');

  const totalRewards = rewards?.reduce((sum, r) => sum + r.amount, 0) || 0;

  return (
    <DashboardOverview
      ownerName={owner?.first_name || 'Owner'}
      stats={{
        totalReferrals: totalReferrals || 0,
        successfulReferrals,
        rewardsEarned: totalRewards,
      }}
      recentReferrals={referrals?.slice(0, 5) || []}
    />
  );
}
