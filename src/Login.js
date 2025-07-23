import { useState } from "react";
import { loginUser } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const result = await loginUser(data);
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      localStorage.setItem("name", result.name);

      showToast("Login successful!", "success");

      setTimeout(() => {
        if (result.role === "Admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }
      }, 1500); 
    } catch (err) {
      showToast("Login failed: " + err.message, "danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
   
      {toast.show && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div
            className={`toast align-items-center text-white bg-${toast.type} show`}
            role="alert"
          >
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

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 p-md-5 rounded shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 text-warning">Login</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          Login
        </button>

        <div className="text-center mt-3">
          <p className="text-muted">
            New user?{" "}
            <a href="/signup" className="text-decoration-none">
              Create an account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
