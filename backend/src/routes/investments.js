const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /api/investments - List all investments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, farmer_name, crop, amount, created_at FROM investments ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
});

// POST /api/investments - Create new investment
router.post('/', async (req, res) => {
  const { farmer_name, crop, amount } = req.body;

  // Validation
  if (!farmer_name || typeof farmer_name !== 'string' || farmer_name.trim().length === 0) {
    return res.status(400).json({ error: 'farmer_name is required and must be a non-empty string' });
  }

  if (!crop || typeof crop !== 'string' || crop.trim().length === 0) {
    return res.status(400).json({ error: 'crop is required and must be a non-empty string' });
  }

  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }

  try {
    // Insert with parameterized query
    const [result] = await db.query(
      'INSERT INTO investments (farmer_name, crop, amount) VALUES (?, ?, ?)',
      [farmer_name.trim(), crop.trim(), numAmount]
    );

    // Fetch the created record
    const [rows] = await db.query(
      'SELECT id, farmer_name, crop, amount, created_at FROM investments WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(500).json({ error: 'Failed to create investment' });
  }
});

module.exports = router;
