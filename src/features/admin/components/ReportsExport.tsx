'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

type Owner = any;
type Referral = any;
type Voucher = any;

type ExportFormat = 'csv' | 'excel' | 'pdf';

export default function ReportsExport({
  owners,
  referrals,
  vouchers,
}: {
  owners: Owner[];
  referrals: Referral[];
  vouchers: Voucher[];
}) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    // Convert to CSV
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => {
        const value = row[h] || '';
        // Escape commas and quotes
        return typeof value === 'string' && value.includes(',') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(','))
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = (data: any[], filename: string, sheetName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = (data: any[], filename: string, title: string, columns: { header: string; dataKey: string }[]) => {
    const doc = new jsPDF();
    
    // Add Pueblo Bonito branding
    doc.setFontSize(18);
    doc.setTextColor(26, 35, 50); // #1A2332
    doc.text('Pueblo Bonito Resorts', 14, 15);
    
    doc.setFontSize(14);
    doc.setTextColor(200, 168, 130); // #C8A882
    doc.text(title, 14, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 35);
    
    // Add table
    autoTable(doc, {
      startY: 45,
      head: [columns.map(col => col.header)],
      body: data.map(row => columns.map(col => row[col.dataKey] || '')),
      theme: 'striped',
      headStyles: {
        fillColor: [200, 168, 130], // #C8A882
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [248, 246, 243], // #F8F6F3
      },
    });
    
    // Add page numbers
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleExportOwners = (format: ExportFormat = 'csv') => {
    setIsExporting(true);
    const data = owners.map(o => ({
      email: o.email,
      first_name: o.first_name,
      last_name: o.last_name,
      phone: o.phone,
      preferred_destination: o.preferred_destination,
      status: o.status,
      total_referrals: o.total_referrals,
      successful_referrals: o.successful_referrals,
      total_rewards_earned: o.total_rewards_earned,
      created_at: new Date(o.created_at).toLocaleDateString('es-MX'),
    }));

    if (format === 'csv') {
      exportToCSV(
        data,
        'propietarios-export',
        ['email', 'first_name', 'last_name', 'phone', 'preferred_destination', 'status', 'total_referrals', 'successful_referrals', 'total_rewards_earned', 'created_at']
      );
    } else if (format === 'excel') {
      exportToExcel(data, 'propietarios-export', 'Propietarios');
    } else if (format === 'pdf') {
      exportToPDF(
        data,
        'propietarios-export',
        'Reporte de Propietarios',
        [
          { header: 'Email', dataKey: 'email' },
          { header: 'Nombre', dataKey: 'first_name' },
          { header: 'Apellido', dataKey: 'last_name' },
          { header: 'Teléfono', dataKey: 'phone' },
          { header: 'Destino', dataKey: 'preferred_destination' },
          { header: 'Estado', dataKey: 'status' },
          { header: 'Total Referidos', dataKey: 'total_referrals' },
          { header: 'Exitosos', dataKey: 'successful_referrals' },
          { header: 'Recompensas', dataKey: 'total_rewards_earned' },
        ]
      );
    }
    
    setIsExporting(false);
  };

  const handleExportReferrals = (format: ExportFormat = 'csv') => {
    setIsExporting(true);
    const data = referrals.map((r: any) => ({
      guest_first_name: r.guest_first_name,
      guest_last_name: r.guest_last_name,
      guest_email: r.guest_email,
      guest_phone: r.guest_phone,
      destination: r.destination,
      status: r.status,
      owner_email: r.owners?.email || '',
      owner_name: r.owners ? `${r.owners.first_name} ${r.owners.last_name}` : '',
      created_at: new Date(r.created_at).toISOString(),
      guest_viewed_at: r.guest_viewed_at ? new Date(r.guest_viewed_at).toISOString() : '',
      guest_accepted_at: r.guest_accepted_at ? new Date(r.guest_accepted_at).toISOString() : '',
    }));

    if (format === 'csv') {
      exportToCSV(
        data,
        'referrals-export',
        ['guest_first_name', 'guest_last_name', 'guest_email', 'guest_phone', 'destination', 'status', 'owner_email', 'owner_name', 'created_at', 'guest_viewed_at', 'guest_accepted_at']
      );
    } else if (format === 'excel') {
      exportToExcel(data, 'referrals-export', 'Referidos');
    } else if (format === 'pdf') {
      exportToPDF(
        data,
        'referrals-export',
        'Reporte de Referidos',
        [
          { header: 'Nombre', dataKey: 'guest_first_name' },
          { header: 'Apellido', dataKey: 'guest_last_name' },
          { header: 'Email', dataKey: 'guest_email' },
          { header: 'Teléfono', dataKey: 'guest_phone' },
          { header: 'Destino', dataKey: 'destination' },
          { header: 'Estado', dataKey: 'status' },
          { header: 'Propietario', dataKey: 'owner_name' },
        ]
      );
    }
    
    setIsExporting(false);
  };

  const handleExportVouchers = (format: ExportFormat = 'csv') => {
    setIsExporting(true);
    const data = vouchers.map((v: any) => ({
      voucher_code: v.voucher_code,
      guest_name: v.guest_name,
      guest_email: v.guest_email,
      amount: v.amount,
      currency: v.currency,
      destination: v.destination,
      status: v.status,
      expires_at: new Date(v.expires_at).toLocaleDateString('es-MX'),
      redeemed_at: v.redeemed_at ? new Date(v.redeemed_at).toLocaleDateString('es-MX') : 'No canjeado',
      created_at: new Date(v.created_at).toLocaleDateString('es-MX'),
    }));

    if (format === 'csv') {
      exportToCSV(
        data,
        'vouchers-export',
        ['voucher_code', 'guest_name', 'guest_email', 'amount', 'currency', 'destination', 'status', 'expires_at', 'redeemed_at', 'created_at']
      );
    } else if (format === 'excel') {
      exportToExcel(data, 'vouchers-export', 'Vouchers');
    } else if (format === 'pdf') {
      exportToPDF(
        data,
        'vouchers-export',
        'Reporte de Vouchers (QR)',
        [
          { header: 'Código', dataKey: 'voucher_code' },
          { header: 'Guest', dataKey: 'guest_name' },
          { header: 'Email', dataKey: 'guest_email' },
          { header: 'Monto', dataKey: 'amount' },
          { header: 'Destino', dataKey: 'destination' },
          { header: 'Estado', dataKey: 'status' },
          { header: 'Expira', dataKey: 'expires_at' },
          { header: 'Canjeado', dataKey: 'redeemed_at' },
        ]
      );
    }
    
    setIsExporting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-serif font-light text-[#1A2332] mb-8">
        Exportar Datos
      </h2>

      <div className="space-y-6">
        {/* Export Owners */}
        <div className="border border-gray-200 rounded-lg p-6 hover:border-[#C8A882]/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">Propietarios</h3>
              <p className="text-sm text-gray-500">{owners.length} registros</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExportOwners('pdf')}
                disabled={isExporting}
                title="Descargar PDF"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleExportOwners('excel')}
                disabled={isExporting}
                title="Descargar Excel"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleExportOwners('csv')}
                disabled={isExporting}
                title="Descargar CSV"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Export Referrals */}
        <div className="border border-gray-200 rounded-lg p-6 hover:border-[#C8A882]/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">Referidos</h3>
              <p className="text-sm text-gray-500">{referrals.length} registros</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExportReferrals('pdf')}
                disabled={isExporting}
                title="Descargar PDF"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleExportReferrals('excel')}
                disabled={isExporting}
                title="Descargar Excel"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleExportReferrals('csv')}
                disabled={isExporting}
                title="Descargar CSV"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Export Vouchers */}
        <div className="border border-gray-200 rounded-lg p-6 hover:border-[#C8A882]/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">Vouchers (QR)</h3>
              <p className="text-sm text-gray-500">{vouchers.length} registros</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExportVouchers('pdf')}
                disabled={isExporting}
                title="Descargar PDF"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleExportVouchers('excel')}
                disabled={isExporting}
                title="Descargar Excel"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleExportVouchers('csv')}
                disabled={isExporting}
                title="Descargar CSV"
                className="p-2 text-gray-600 hover:text-[#C8A882] hover:bg-[#C8A882]/10 rounded-lg transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center font-light">
          Los reportes se descargan con fecha automática • PDF • Excel • CSV
        </p>
      </div>
    </div>
  );
}
