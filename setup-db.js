const mysql = require('mysql2/promise');

async function setupDatabase() {
  console.log('Setting up database tables...');
  
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'u984810592_svs',
    password: 'sCARFACE@aMISHA@1804',
    database: 'u984810592_svs_cne',
    port: 3306
  });

  try {
    // Create workshops table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS workshops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATETIME NOT NULL,
        maxAttendees INT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_date (date)
      )
    `);
    console.log('✓ workshops table created');

    // Create registrations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        workshopId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        organization VARCHAR(255),
        designation VARCHAR(255),
        nursingRegNo VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (workshopId) REFERENCES workshops(id) ON DELETE CASCADE,
        INDEX idx_workshop (workshopId),
        INDEX idx_email (email)
      )
    `);
    console.log('✓ registrations table created');

    // Create attendances table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS attendances (
        id INT AUTO_INCREMENT PRIMARY KEY,
        registrationId INT NOT NULL,
        checkedInAt DATETIME NOT NULL,
        checkedInBy VARCHAR(255),
        FOREIGN KEY (registrationId) REFERENCES registrations(id) ON DELETE CASCADE,
        INDEX idx_registration (registrationId)
      )
    `);
    console.log('✓ attendances table created');

    console.log('\nDatabase setup complete!');
  } catch (error) {
    console.error('Database setup error:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

setupDatabase().catch(console.error);
