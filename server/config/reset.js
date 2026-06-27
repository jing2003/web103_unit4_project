import { pool } from "./database.js";
import "./dotenv.js";
import furinaData from "../data/furinas.js";

const createFurinasTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS custom_furinas;

    CREATE TABLE IF NOT EXISTS custom_furinas (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      outfit TEXT NOT NULL,
      pose TEXT NOT NULL,
      expression TEXT NOT NULL,
      background TEXT NOT NULL,
      total_price NUMERIC NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 custom_furinas table created successfully");
  } catch (error) {
    console.error("⚠️ error creating custom_furinas table", error);
  }
};

const seedFurinasTable = async () => {
  await createFurinasTable();

  furinaData.forEach((furina) => {
    const insertQuery = {
      text: `
        INSERT INTO custom_furinas (
          name,
          outfit,
          pose,
          expression,
          background,
          total_price
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      values: [
        furina.name,
        furina.outfit,
        furina.pose,
        furina.expression,
        furina.background,
        furina.total_price,
      ],
    };

    pool.query(insertQuery, (error, res) => {
      if (error) {
        console.error("⚠️ error inserting Furina custom item", error);
        return;
      }

      console.log(`✅ ${furina.name} added successfully`);
    });
  });
};

seedFurinasTable();
