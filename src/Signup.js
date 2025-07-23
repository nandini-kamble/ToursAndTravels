import { registerUser } from "./api";

function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      role: "User",
    };

    try {
      await registerUser(data);
      alert("Registration successful");
      window.location.href = "/login";
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 p-md-5 rounded shadow-sm w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center text-primary mb-4">Signup</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
