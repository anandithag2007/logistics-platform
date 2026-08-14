const express = require("express");
const router = express.Router();

const verifyToken = require(
  "../middleware/authMiddleware"
);

const {
  createShipment,
  getAllShipments,
  updateShipmentStatus,
  deleteShipment,
} = require("../controllers/shipmentController");

router.post(
  "/create",
  verifyToken,
  createShipment
);

router.get(
  "/all",
  verifyToken,
  getAllShipments
);

router.put(
  "/status/:id",
  verifyToken,
  updateShipmentStatus
);

router.delete(
  "/:id",
  verifyToken,
  deleteShipment
);

module.exports = router;