const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

// Read the migration file
const migrationPath = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

console.log('🚀 Starting database migration...\n');
console.log('📊 Supabase URL:', SUPABASE_URL);
console.log('📄 Migration file:', migrationPath);
console.log('📝 SQL length:', migrationSQL.length, 'characters\n');

// Execute the migration using Supabase REST API
async function runMigration() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        query: migrationSQL
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    console.log('✅ Migration completed successfully!\n');
    console.log('📊 Result:', result);
    
    console.log('\n✨ Database is ready! You can now:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Visit: http://localhost:3000/homeowner');
    console.log('   3. Test the magic link authentication\n');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('\n💡 Alternative: Run the migration manually in Supabase SQL Editor:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/npbbllufwjhbcqsexrsc/sql');
    console.log('   2. Copy the contents of: supabase/migrations/001_initial_schema.sql');
    console.log('   3. Paste and run in the SQL Editor\n');
    process.exit(1);
  }
}

runMigration();
