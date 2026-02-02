/**
 * Verification script for Supabase configuration
 * Run this to check if all tables and policies are set up correctly
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function verifySupabaseSetup() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('🔍 Verificando configuración de Supabase...\n');

  const results = {
    tables: [] as string[],
    missingTables: [] as string[],
    success: true,
  };

  // Check required tables
  const requiredTables = ['owners', 'referrals', 'opportunities', 'rewards', 'activity_log'];

  for (const tableName of requiredTables) {
    try {
      const { error } = await supabase.from(tableName).select('id').limit(1);
      
      if (error) {
        if (error.message.includes('does not exist') || error.code === '42P01') {
          console.log(`❌ Tabla "${tableName}" NO existe`);
          results.missingTables.push(tableName);
          results.success = false;
        } else if (error.code === 'PGRST301') {
          console.log(`✅ Tabla "${tableName}" existe (pero está vacía)`);
          results.tables.push(tableName);
        } else {
          console.log(`⚠️  Tabla "${tableName}" existe pero hay un problema: ${error.message}`);
          results.tables.push(tableName);
        }
      } else {
        console.log(`✅ Tabla "${tableName}" existe y tiene datos`);
        results.tables.push(tableName);
      }
    } catch (error: any) {
      console.log(`❌ Error verificando tabla "${tableName}": ${error.message}`);
      results.missingTables.push(tableName);
      results.success = false;
    }
  }

  console.log('\n📊 Resumen:');
  console.log(`✅ Tablas encontradas: ${results.tables.length}/${requiredTables.length}`);
  console.log(`❌ Tablas faltantes: ${results.missingTables.length}`);

  if (results.missingTables.length > 0) {
    console.log('\n⚠️  ACCIÓN REQUERIDA:');
    console.log('Las siguientes tablas faltan:');
    results.missingTables.forEach(table => console.log(`  - ${table}`));
    console.log('\n📝 Por favor ejecuta el script "supabase-setup.sql" en Supabase SQL Editor');
    console.log('👉 https://npbbllufwjhbcqsexrsc.supabase.co/project/npbbllufwjhbcqsexrsc/sql');
  } else {
    console.log('\n✨ ¡Todo configurado correctamente!');
  }

  return results;
}

// Test authentication providers
export async function verifyAuthProviders() {
  console.log('\n🔐 Verificando proveedores de autenticación...\n');

  // We can't check this directly from the client, but we can provide instructions
  console.log('Para verificar los proveedores OAuth:');
  console.log('1. Ve a: https://npbbllufwjhbcqsexrsc.supabase.co/project/npbbllufwjhbcqsexrsc/auth/providers');
  console.log('2. Verifica que estén habilitados:');
  console.log('   - ✅ Email');
  console.log('   - ✅ Google (si configuraste OAuth)');
  console.log('   - ✅ Facebook (si configuraste OAuth)');
  console.log('\n📚 Para configurar OAuth, consulta: INSTRUCCIONES-RAPIDAS.md');
}

// Run verification if executed directly
if (require.main === module) {
  verifySupabaseSetup()
    .then(() => verifyAuthProviders())
    .catch(console.error);
}
