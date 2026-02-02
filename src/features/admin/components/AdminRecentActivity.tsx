import { getActivityLogs } from '@/features/admin/actions/adminActions';

export default async function AdminRecentActivity() {
  const result = await getActivityLogs(10);

  if (result.error || !result.logs) {
    return null;
  }

  const getActionLabel = (action: string) => {
    const labels: { [key: string]: string } = {
      generated_voucher: '🎟️ Generó voucher',
      redeemed_voucher: '✅ Canjeó voucher',
      updated_referral_status: '📝 Actualizó referido',
      created_referral: '➕ Creó referido',
      contacted_guest: '📞 Contactó guest',
    };
    return labels[action] || action;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-serif font-light text-[#1A2332]">
          Actividad Reciente
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {result.logs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay actividad reciente
          </div>
        ) : (
          result.logs.map((log: any) => (
            <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">
                      {log.admins?.first_name || 'Admin'} {log.admins?.last_name || ''}
                    </span>
                    {' '}
                    <span className="text-gray-600">{getActionLabel(log.action)}</span>
                  </p>
                  {log.details && (
                    <p className="text-xs text-gray-500 mt-1">
                      {JSON.stringify(log.details)}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-400 ml-4">
                  {formatDate(log.created_at)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
