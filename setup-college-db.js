const mysql = require('mysql2/promise');

async function run() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'u984810592_svs',
    password: 'sCARFACE@aMISHA@1804',
    database: 'u984810592_svs_cne',
    port: 3306
  });

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`enquiries\` (
      \`id\` VARCHAR(191) NOT NULL,
      \`name\` VARCHAR(100) NOT NULL,
      \`phone\` VARCHAR(15) NOT NULL,
      \`email\` VARCHAR(100) NOT NULL DEFAULT '',
      \`course\` VARCHAR(100) NOT NULL DEFAULT '',
      \`message\` TEXT NOT NULL,
      \`source\` VARCHAR(20) NOT NULL DEFAULT 'contact',
      \`ipAddress\` VARCHAR(50) NOT NULL DEFAULT '',
      \`createdAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX idx_phone (\`phone\`),
      INDEX idx_createdAt (\`createdAt\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✓ enquiries table ready');

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`admission_applications\` (
      \`id\` VARCHAR(191) NOT NULL,
      \`fullName\` VARCHAR(100) NOT NULL,
      \`dateOfBirth\` VARCHAR(20) NOT NULL,
      \`gender\` VARCHAR(10) NOT NULL,
      \`phone\` VARCHAR(15) NOT NULL,
      \`email\` VARCHAR(100) NOT NULL DEFAULT '',
      \`address\` TEXT NOT NULL,
      \`tenthBoard\` VARCHAR(100) NOT NULL,
      \`tenthPercent\` VARCHAR(10) NOT NULL,
      \`twelthBoard\` VARCHAR(100) NOT NULL,
      \`twelthPercent\` VARCHAR(10) NOT NULL,
      \`twelthStream\` VARCHAR(50) NOT NULL,
      \`category\` VARCHAR(20) NOT NULL DEFAULT 'General',
      \`hasDisability\` BOOLEAN NOT NULL DEFAULT FALSE,
      \`isAnmRegistered\` BOOLEAN NOT NULL DEFAULT FALSE,
      \`status\` VARCHAR(20) NOT NULL DEFAULT 'pending',
      \`notes\` TEXT NOT NULL,
      \`ipAddress\` VARCHAR(50) NOT NULL DEFAULT '',
      \`createdAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX idx_phone (\`phone\`),
      INDEX idx_status (\`status\`),
      INDEX idx_createdAt (\`createdAt\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✓ admission_applications table ready');

  await conn.end();
  console.log('Done!');
}

run().catch(e => { console.error('Error:', e.message, '\nCode:', e.code, '\nStack:', e.stack); process.exit(1); });
