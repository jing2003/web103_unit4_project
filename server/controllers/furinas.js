import { pool } from "../config/database.js";

const validOutfits = ["ousia", "pneuma"];
const validPoses = ["standing", "thinking", "alpha", "playing", "eating"];
const validExpressions = ["default", "confident", "wink", "fixed"];
const validBackgrounds = ["midnight", "morning", "noon", "evening"];

const validateFurina = (furina) => {
  const { name, outfit, pose, expression, background, total_price } = furina;

  if (
    !name ||
    !outfit ||
    !pose ||
    !expression ||
    !background ||
    total_price === undefined
  ) {
    return "Please complete all required fields.";
  }

  if (!validOutfits.includes(outfit)) {
    return "Invalid outfit selected.";
  }

  if (!validPoses.includes(pose)) {
    return "Invalid pose selected.";
  }

  if (!validExpressions.includes(expression)) {
    return "Invalid expression selected.";
  }

  if (!validBackgrounds.includes(background)) {
    return "Invalid background selected.";
  }

  if ((pose === "playing" || pose === "eating") && expression !== "fixed") {
    return "Playing and eating poses have fixed expressions and cannot use custom expressions.";
  }

  if (
    (pose === "standing" || pose === "thinking" || pose === "alpha") &&
    expression === "fixed"
  ) {
    return "Fixed expression can only be used with playing or eating poses.";
  }

  return null;
};

const getFurinas = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM custom_furinas ORDER BY id ASC";
    const results = await pool.query(selectQuery);

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getFurinaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const selectQuery = "SELECT * FROM custom_furinas WHERE id = $1";
    const results = await pool.query(selectQuery, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Custom Furina not found." });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const createFurina = async (req, res) => {
  try {
    const { name, outfit, pose, expression, background } = req.body;

    const total_price = req.body.total_price ?? req.body.totalPrice;

    const newFurina = {
      name,
      outfit,
      pose,
      expression,
      background,
      total_price,
    };

    const validationError = validateFurina(newFurina);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const insertQuery = `
      INSERT INTO custom_furinas (
        name,
        outfit,
        pose,
        expression,
        background,
        total_price
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [name, outfit, pose, expression, background, total_price];

    const results = await pool.query(insertQuery, values);

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateFurina = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, outfit, pose, expression, background } = req.body;

    const total_price = req.body.total_price ?? req.body.totalPrice;

    const updatedFurina = {
      name,
      outfit,
      pose,
      expression,
      background,
      total_price,
    };

    const validationError = validateFurina(updatedFurina);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const updateQuery = `
      UPDATE custom_furinas
      SET
        name = $1,
        outfit = $2,
        pose = $3,
        expression = $4,
        background = $5,
        total_price = $6
      WHERE id = $7
      RETURNING *
    `;

    const values = [
      name,
      outfit,
      pose,
      expression,
      background,
      total_price,
      id,
    ];

    const results = await pool.query(updateQuery, values);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Custom Furina not found." });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteFurina = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deleteQuery = "DELETE FROM custom_furinas WHERE id = $1 RETURNING *";
    const results = await pool.query(deleteQuery, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Custom Furina not found." });
    }

    res.status(200).json({
      message: "Custom Furina deleted successfully.",
      deletedFurina: results.rows[0],
    });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getFurinas,
  getFurinaById,
  createFurina,
  updateFurina,
  deleteFurina,
};
