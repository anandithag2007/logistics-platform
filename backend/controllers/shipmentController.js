const db = require("../config/db");

const createShipment = (req, res) => {
    if (
  !shipment_name ||
  !origin ||
  !destination
) {
  return res.status(400).json({
    message: "All fields are required",
  });
}
    const {
    shipment_name,
    origin,
    destination,
    priority,
  } = req.body;

  const sql = `
    INSERT INTO shipments
    (shipment_name, origin, destination, priority)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      shipment_name,
      origin,
      destination,
      priority,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Shipment created successfully",
      });
    }
  );
};

const getAllShipments = (req, res) => {
  const sql = `
    SELECT *
    FROM shipments
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(200).json(results);
  });
};

const updateShipmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = `
    UPDATE shipments
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(200).json({
        message: "Shipment status updated",
      });
    }
  );
};

const deleteShipment = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM shipments
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(200).json({
      message: "Shipment deleted successfully",
    });
  });
};

module.exports = {
  createShipment,
  getAllShipments,
  updateShipmentStatus,
  deleteShipment,
};