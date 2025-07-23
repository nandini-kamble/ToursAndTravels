import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AboutUs() {
  return (
    <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: 1000 }}>
        <h2 className="text-center text-warning mb-5">Meet Our Team</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4 d-flex justify-content-center">
            <div className="card text-center shadow h-100">
              <img
                src="/Sarang.png"
                alt="Sarang Lakadkar"
                className="card-img-top img-fluid"
                style={{ objectFit: "cover", height: "250px" }}
              />
              <div className="card-body">
                <h5 className="card-title">Sarang Lakadkar</h5>
                <p className="card-text">Full Stack Developer</p>
                <p className="card-text">
                  <b>Email:</b> lakadkarsarang@gmail.com
                </p>
                <p className="card-text">
                  <b>Phone:</b> +91-9637828267
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <div className="card text-center shadow h-100">
              <img
                src="/Rajnandini.jpg"
                alt="Rajnandini Kamble"
                className="card-img-top img-fluid"
                style={{ objectFit: "cover", height: "250px" }}
              />
              <div className="card-body">
                <h5 className="card-title">Rajnandini Kamble</h5>
                <p className="card-text">Full Stack Developer</p>
                <p className="card-text">
                  <b>Email:</b> rajnandinikamble04@gmail.com
                </p>
                <p className="card-text">
                  <b>Phone:</b> +91-8999157014
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <div className="card text-center shadow h-100">
              <img
                src="/Sumayya.jpeg"
                alt="Sumayya Khan"
                className="card-img-top img-fluid"
                style={{ objectFit: "cover", height: "250px" }}
              />
              <div className="card-body">
                <h5 className="card-title">Sumayya Khan</h5>
                <p className="card-text">Full Stack Developer</p>
                <p className="card-text">
                  <b>Email:</b> sumayyaanjum1505@gmail.com
                </p>
                <p className="card-text">
                  <b>Phone:</b> +91-7744952796
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
