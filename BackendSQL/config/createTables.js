// require("dotenv").config();
// const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT) || 5432,
// });

// const createTables = async () => {
//   try {
//     // Create superadmin table
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS superadmin (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL,
//         password TEXT NOT NULL,
//         role VARCHAR(50) DEFAULT 'superadmin',
//         permissions JSONB DEFAULT '{}'::jsonb,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     console.log("✅ Superadmin table created successfully");

//     // Create clients table
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS clients (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(150) NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL,
//         phone VARCHAR(15),
//         address TEXT,
//         status VARCHAR(20) DEFAULT 'active',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     console.log("✅ Clients table created successfully");

//     // Create plans table
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS plans (
//         id SERIAL PRIMARY KEY,
//         plan_name VARCHAR(100) NOT NULL,
//         description TEXT,
//         price DECIMAL(10,2) NOT NULL,
//         duration_in_months INT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     console.log("✅ Plans table created successfully");

//     // Create client_plans table
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS client_plans (
//         id SERIAL PRIMARY KEY,
//         client_id INT REFERENCES clients(id) ON DELETE CASCADE,
//         plan_id INT REFERENCES plans(id) ON DELETE CASCADE,
//         start_date DATE NOT NULL,
//         end_date DATE NOT NULL,
//         status VARCHAR(20) DEFAULT 'active',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     console.log("✅ Client_plans table created successfully");
//   } catch (error) {
//     console.error("❌ Error creating tables:", error.message);
//   }
// };

// createTables();

// module.exports = createTables;

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

const createTables = async () => {
  try {
    // Create superadmin table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS superadmin (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'superadmin',
        permissions JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Superadmin table created successfully");

    // Create clients table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'client',
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Clients table created successfully");

    // Create plans table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id SERIAL PRIMARY KEY,
        plan_name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        duration_in_months INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Plans table created successfully");

    // Create client_plans table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS client_plans (
        id SERIAL PRIMARY KEY,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        plan_id INT REFERENCES plans(id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Client_plans table created successfully");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS client_details (
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        username VARCHAR(255),
        facebook_page_id VARCHAR(255),
        instagram_business_id VARCHAR(255),
        facebook_page_access_token VARCHAR(500),
        shopify_store_name VARCHAR(255),
        shopify_store_url TEXT,
        shopify_access_token VARCHAR(255),
        shopify_api_key VARCHAR(255),
        shopify_shared_secret VARCHAR(500),
        woocommerce_store_name VARCHAR(255),
        woocommerce_store_url TEXT,
        woocommerce_consumer_key VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Client_details table created successfully");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS video_details (
        video_id BIGINT PRIMARY KEY,  
        client_id INT,
        likes_count INT,
        caption TEXT,
        media_url TEXT,
        CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ video_details table created successfully");

    // Create user_subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        plan_id INT NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id), -- Ensures a user can only have one active subscription
        FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ User_subscriptions table created successfully");
  } catch (error) {
    console.error("❌ Error creating tables:", error.message);
  }
};

createTables();

module.exports = createTables;

// const pool = require("./db");

// const createTables = async () => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS superadmin (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL,
//         password TEXT NOT NULL,
//         role VARCHAR(50) DEFAULT 'superadmin',
//         permissions JSONB DEFAULT '{}'::jsonb,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     console.log("✅ Superadmin table created successfully");
//   } catch (error) {
//     console.error("❌ Error creating tables:", error);
//   }
// };

// module.exports = createTables;
