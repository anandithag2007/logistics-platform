const db = require("../config/db");

const createShipment = async (req, res) => {
  try {
    const {
      shipment_name,
      origin,
      destination,
      priority,
    } = req.body;

    if (
      !shipment_name ||
      !origin ||
      !destination
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await db.query(
      `
      INSERT INTO shipments
      (shipment_name, origin, destination, priority)
      VALUES ($1, $2, $3, $4)
      `,
      [
        shipment_name,
        origin,
        destination,
        priority,
      ]
    );

    res.status(201).json({
      message: "Shipment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllShipments = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM shipments
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateShipmentStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      `
      UPDATE shipments
      SET status = $1
      WHERE id = $2
      `,
      [status, id]
    );

    res.status(200).json({
      message: "Shipment status updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      DELETE FROM shipments
      WHERE id = $1
      `,
      [id]
    );

    res.status(200).json({
      message: "Shipment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createShipment,
  getAllShipments,
  updateShipmentStatus,
  deleteShipment,
};