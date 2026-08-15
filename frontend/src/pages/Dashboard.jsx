import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);

  const [shipmentName, setShipmentName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [priority, setPriority] = useState("LOW");

  const total = shipments.length;

  const pending = shipments.filter(
    (s) => s.status === "PENDING"
  ).length;

  const transit = shipments.filter(
    (s) => s.status === "IN_TRANSIT"
  ).length;

  const delivered = shipments.filter(
    (s) => s.status === "DELIVERED"
  ).length;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchShipments();
  }, [navigate]);

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  const fetchShipments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/api/shipments/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShipments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createShipment = async () => {
    if (
      !shipmentName ||
      !origin ||
      !destination
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/shipments/create",
        {
          shipment_name: shipmentName,
          origin,
          destination,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Shipment Created");

      setShipmentName("");
      setOrigin("");
      setDestination("");
      setPriority("LOW");

      fetchShipments();
    } catch (error) {
      console.error(error);
      alert("Failed to create shipment");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/api/shipments/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Shipment status updated");

      fetchShipments();
    } catch (error) {
      console.error(error);
      alert("Failed to update shipment status");
    }
  };

  const deleteShipment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shipment?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `/api/shipments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Shipment deleted");

      fetchShipments();
    } catch (error) {
      console.error(error);
      alert("Failed to delete shipment");
    }
  };

  return (
    <div className="container">
      <Navbar onLogout={handleLogout} />

      <div className="stats-grid">
        <div className="stat-card total">
          <h2>{total}</h2>
          <p>Total Shipments</p>
        </div>

        <div className="stat-card pending">
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card transit">
          <h2>{transit}</h2>
          <p>In Transit</p>
        </div>

        <div className="stat-card delivered">
          <h2>{delivered}</h2>
          <p>Delivered</p>
        </div>
      </div>

      <div className="card shipment-form">
        <h2>Create Shipment</h2>

        <input
          type="text"
          placeholder="Shipment Name"
          value={shipmentName}
          onChange={(e) =>
            setShipmentName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) =>
            setOrigin(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
        />

        <br />
        <br />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="EXPRESS">EXPRESS</option>
        </select>

        <br />
        <br />

        <button onClick={createShipment}>
          Create Shipment
        </button>
      </div>

      <hr />

      <div className="card">
        <h2>Your Shipments</h2>

        <br />

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Shipment</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan="6">
                  🚚 No shipments found. Create your first shipment above.
                </td>
              </tr>
            ) : (
              shipments.map((shipment, index) => (
                <tr key={shipment.id}>
                  <td>{index + 1}</td>

                  <td>{shipment.shipment_name}</td>

                  <td>{shipment.origin}</td>

                  <td>{shipment.destination}</td>

                  <td>
                    <select
                      value={shipment.status}
                      onChange={(e) =>
                        updateStatus(
                          shipment.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="PENDING">
                        PENDING
                      </option>

                      <option value="IN_TRANSIT">
                        IN TRANSIT
                      </option>

                      <option value="DELIVERED">
                        DELIVERED
                      </option>
                    </select>
                  </td>

                  <td>
                    <button
  className="delete-btn"
  onClick={() =>
    deleteShipment(shipment.id)
  }
>
  Delete
</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;