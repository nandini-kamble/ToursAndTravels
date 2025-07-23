import { useEffect, useState } from "react";
import { fetchDestinations } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function Destinations() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations()
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading destinations...</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary animate__animated animate__fadeInDown">
        Explore Our Top Destinations
      </h2>
      <div className="row g-4">
        {places.map((place, index) => (
          <div
            key={place.id}
            className="col-sm-12 col-md-6 col-lg-4 animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.1}s`, animationDuration: "0.6s" }}
          >
            <div className="card h-100 shadow-sm border-0">
              <img
                src={place.imageUrl}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/400x200?text=No+Image")
                }
                className="card-img-top"
                alt={place.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{place.name}</h5>
                  <p className="card-text text-muted">{place.description}</p>
                </div>
                <button className="btn btn-outline-primary mt-3">Explore</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
