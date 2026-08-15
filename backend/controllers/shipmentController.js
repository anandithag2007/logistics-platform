const db = require("../config/db");

const createShipment = async (req, res) => {
  try {
    const {
      shipment_name,
      origin,
      destination,
      priority,
    } = req.body;
    const user_id = req.user.id;
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
  (
    shipment_name,
    origin,
    destination,
    priority,
    user_id
  )
  VALUES ($1, $2, $3, $4, $5)
  `,
  [
    shipment_name,
    origin,
    destination,
    priority,
    user_id,
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
    const user_id = req.user.id;

const result = await db.query(
  `
  SELECT *
  FROM shipments
  WHERE user_id = $1
  ORDER BY
CASE priority
    WHEN 'EXPRESS' THEN 1
    WHEN 'HIGH' THEN 2
    WHEN 'MEDIUM' THEN 3
    WHEN 'LOW' THEN 4
END,
created_at DESC
  `,
  [user_id]
);

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

    const user_id = req.user.id;

await db.query(
  `
  UPDATE shipments
  SET status = $1
  WHERE id = $2
  AND user_id = $3
  `,
  [status, id, user_id]
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

    const user_id = req.user.id;

await db.query(
  `
  DELETE FROM shipments
  WHERE id = $1
  AND user_id = $2
  `,
  [id, user_id]
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