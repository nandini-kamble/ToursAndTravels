import { useEffect, useState } from "react";

function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  const name = localStorage.getItem("name");

  const handleCancel = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    alert("Booking cancelled.");
  };

  return (
    <div className="container py-5 min-vh-100">
      <h2 className="mb-3 text-warning">Welcome, {name}</h2>
      <h4 className="mb-4 text-dark">Your Booked Trips</h4>

      {bookings.length === 0 ? (
        <p className="text-muted fst-italic">You haven’t booked any trips yet.</p>
      ) : (
        <div className="row g-4">
          {bookings.map((b, idx) => (
            <div className="col-sm-6 col-lg-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <img
                  src={b.image}
                  className="card-img-top"
                  alt={b.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{b.name}</h5>
                  <p className="card-text text-muted">{b.description}</p>
                  <p className="card-text mt-auto">
                    <small className="text-secondary">
                      <strong>Booking Date:</strong> {b.date}
                    </small>
                  </p>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleCancel(idx)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
