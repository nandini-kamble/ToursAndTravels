import { useEffect, useState } from "react";
import { isLoggedIn } from "./Auth";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const fetchDestinations = async () => {
    const res = await fetch("http://localhost:7280/api/destination");
    const data = await res.json();
    setDestinations(data);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      showToast("Session expired. Redirecting...", "danger");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      showToast("Access denied. Only Admin allowed.", "danger");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      fetchDestinations();
    }
  }, []);

  const handleSubmit = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:7280/api/destination/${editId}`
      : "http://localhost:7280/api/destination";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name,
        imageUrl: image,
        description,
        moreInfo,
      }),
    });

    if (res.ok) {
      showToast(editId ? "Destination updated" : "Destination added", "success");
      setName("");
      setImage("");
      setDescription("");
      setMoreInfo("");
      setEditId(null);
      fetchDestinations();
    } else {
      const error = await res.text();
      console.error("Error:", error);
      showToast("Request failed: " + error, "danger");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:7280/api/destination/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      showToast("Destination deleted", "success");
      fetchDestinations();
    } else {
      showToast("Delete failed", "danger");
    }
  };

  return (
    <div className="container py-5 position-relative">
    
      {toast.show && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className={`toast text-white bg-${toast.type} show`} role="alert">
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast({ ...toast, show: false })}
              ></button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>

     
      <div className="card mb-5 shadow">
        <div className="card-header bg-info text-white">
          {editId ? "Edit Destination" : "Add New Destination"}
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Destination Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Short Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                rows={2}
                placeholder="More Info (optional)"
                value={moreInfo}
                onChange={(e) => setMoreInfo(e.target.value)}
              />
            </div>

            <div className="col-12 text-end">
              <button className="btn btn-success" onClick={handleSubmit}>
                {editId ? "Update Destination" : "Add Destination"}
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div>
        <h3 className="mb-4">All Destinations</h3>
        {destinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          <div className="row g-4">
            {destinations.map((d) => (
              <div className="col-md-4" key={d.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{d.name}</h5>
                    <p className="card-text">{d.description}</p>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setEditId(d.id);
                          setName(d.name);
                          setImage(d.imageUrl);
                          setDescription(d.description);
                          setMoreInfo(d.moreInfo || "");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(d.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
