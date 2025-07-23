import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ContactUs() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_22ad9ch",
        "template_9aa9r58",
        form.current,
        "Yox1HDqMLx935AxJU"
      )
      .then(
        () => {
          setLoading(false);
          showToast("Message sent successfully!", "success");
          form.current.reset();
        },
        () => {
          setLoading(false);
          showToast("Failed to send message. Try again.", "danger");
        }
      );
  };

  return (
    <div className="container py-5 position-relative">
     
      {toast.show && (
        <div className="toast-container">
          <div className={`toast align-items-center text-white bg-${toast.type} show`} role="alert">
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

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center text-primary mb-4">
                Contact Us
              </h2>

              <form ref={form} onSubmit={sendEmail}>
                <div className="mb-3">
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    className="form-control"
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    className="form-control"
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="form-control"
                    required
                    placeholder="Type your message..."
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
