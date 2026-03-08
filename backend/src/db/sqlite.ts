import Database from 'better-sqlite3';

const db = new Database('database.sqlite');
db.pragma('journal_mode = WAL'); // Better performance

// Initialize Tables
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        full_name TEXT,
        referrer_id TEXT,
        role TEXT DEFAULT 'partner',
        rank TEXT DEFAULT 'bronze',
        wallet_balance REAL DEFAULT 0,
        team_size INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        description TEXT,
        retail_price REAL,
        wholesale_price REAL,
        moq INTEGER,
        category TEXT,
        image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        status TEXT,
        total_amount REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS commissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        partner_id TEXT,
        order_id TEXT,
        amount REAL,
        status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(partner_id) REFERENCES users(id),
        FOREIGN KEY(order_id) REFERENCES orders(id)
    );
`);

// Insert initial mock data if empty
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (productCount.count === 0) {
    const insertProduct = db.prepare(`
        INSERT INTO products (id, name, description, retail_price, wholesale_price, moq, category, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProduct.run('1', 'Midnight Rose', 'A deep, mysterious floral scent.', 1200, 800, 5, 'fragrances', '/media__1772958571143.jpg');
    insertProduct.run('2', 'Ocean Breeze', 'Fresh and aquatic notes.', 1000, 650, 5, 'fragrances', '/media__1772958613507.jpg');
    insertProduct.run('3', 'Golden Amber', 'Warm and inviting aroma.', 1450, 950, 5, 'fragrances', 'https://via.placeholder.com/300');
}

export default db;
