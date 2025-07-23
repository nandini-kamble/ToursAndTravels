import "./App.css";
import { isLoggedIn, logout } from "./Auth";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Login from "./Login";
import Signup from "./Signup";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { fetchDestinations } from "./api";

const carouselImages = [
  "https://wallpaperaccess.com/full/2592133.jpg",
  "https://img.freepik.com/premium-photo/travel-traveling-symbolic-picture-vacation-background-86_1032298-2270.jpg",
  "https://wallpaperaccess.com/full/1431673.jpg",
];

function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container my-4">
      <div
        className="carousel slide rounded overflow-hidden"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {carouselImages.map((img, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === current ? "active" : ""}`}
            >
              <img
                src={img}
                className="d-block w-100"
                style={{ maxHeight: 500, objectFit: "cover" }}
                alt="Slide"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <h1>Explore the World with Us!</h1>
        <p>
          Your adventure starts here. Discover amazing tours and travel
          packages.
        </p>
      </div>
    </div>
  );
}

function Destinations() {
  const [start, setStart] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const visibleCount = 3;

  useEffect(() => {
    fetchDestinations()
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error fetching destinations", err));
  }, []);

  const total = destinations.length;
  const prev = () => setStart((start - 1 + total) % total);
  const next = () => setStart((start + 1) % total);

  const getVisible = () => {
    const arr = [];
    const used = new Set();
    let idx = start;
    while (arr.length < visibleCount && used.size < total) {
      const dest = destinations[idx % total];
      if (!used.has(dest.imageUrl)) {
        arr.push(dest);
        used.add(dest.imageUrl);
      }
      idx++;
    }
    return arr;
  };

  const navigate = useNavigate();

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Popular Places to Visit</h2>
      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <button className="btn btn-outline-primary" onClick={prev}>
            &larr;
          </button>
        </div>
        <div className="col">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {getVisible().map((place) => (
              <div className="col" key={place.id}>
                <div className="card h-100">
                  <img
                    src={place.imageUrl}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                    alt={place.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{place.name}</h5>
                    <p className="card-text">{place.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(`/place/${encodeURIComponent(place.name)}`)
                      }
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-primary" onClick={next}>
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

function PlaceDetails() {
  const { name } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations().then((all) => {
      const found = all.find((p) => p.name === name);
      setPlace(found);
    });
  }, [name]);

  if (!place)
    return (
      <div className="text-center p-5">Loading... or Place not found.</div>
    );

  const handleBooking = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const booking = {
      name: place.name,
      image: place.imageUrl,
      description: place.description,
      date: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("Trip booked successfully!");
    navigate("/user");
  };

  return (
    <div className="container my-5 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
      <img
        src={place.imageUrl}
        alt={place.name}
        className="img-fluid rounded shadow"
        style={{ maxWidth: 600, maxHeight: 520, objectFit: "cover" }}
      />
      <div className="text-center">
        <h2 className="text-primary mb-3">{place.name}</h2>
        <p className="lead">{place.moreInfo || place.description}</p>
        <button className="btn btn-success" onClick={handleBooking}>
          Book a Trip
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p>
          <strong>Contact Us:</strong> info@toursandtravels.com | Phone: +1 234
          567 890
        </p>
        <p>
          &copy; {new Date().getFullYear()} WanderLite Tours. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

function App() {
  function FooterConditional() {
    const location = useLocation();
    const hideFooter = ["/contact", "/login", "/signup"].includes(
      location.pathname
    );
    return hideFooter ? null : <Footer />;
  }

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <nav
          className="navbar navbar-expand-lg navbar-light shadow-sm"
          style={{ backgroundColor: "white" }}
        >
          <div className="container">
            <Link className="navbar-brand fw-bold text-primary" to="/">
              🌍 WanderLite <small className="text-muted">Tours</small>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link hover-highlight" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link hover-highlight" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link hover-highlight" to="/contact">
                    Contact Us
                  </Link>
                </li>

                {!isLoggedIn() ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link hover-highlight" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {localStorage.getItem("role") === "Admin" && (
                      <li className="nav-item">
                        <Link className="nav-link hover-highlight" to="/admin">
                          Admin
                        </Link>
                      </li>
                    )}
                    {localStorage.getItem("role") === "User" && (
                      <li className="nav-item">
                        <Link className="nav-link hover-highlight" to="/user">
                          User
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <button
                        className="btn btn-sm btn-outline-dark ms-2"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <MainContent />
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/place/:name" element={<PlaceDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>

        <FooterConditional />
      </div>
    </Router>
  );
}

function MainContent() {
  return (
    <div className="container my-5">
      <section className="mb-5">
        <h2 className="text-center mb-4">Featured Tours</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Paris Getaway</h5>
                <p className="card-text">
                  Experience the romance and beauty of Paris with our exclusive
                  5-day tour.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Safari Adventure</h5>
                <p className="card-text">
                  Join us for a thrilling safari in Kenya and witness the
                  majestic wildlife.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Beach Paradise</h5>
                <p className="card-text">
                  Relax on the pristine beaches of Maldives with our
                  all-inclusive package.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Destinations />
    </div>
  );
}

export default App;
