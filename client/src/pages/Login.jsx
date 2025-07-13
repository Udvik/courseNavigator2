import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log(data);

    if (data.name != null) {
      if (data.isAdmin) {
        localStorage.setItem("isAdmin", true);
        navigate("/");
      } else {
        localStorage.setItem("isAdmin", false);
        navigate("/");
      }
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div
  className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6"
  style={{ backgroundColor: "#1e293b" }}
>
  {/* Demo Credentials */}
  <div className="bg-blue-100 border border-blue-300 rounded px-6 py-5 text-sm text-gray-800 w-full max-w-sm shadow">
    <div className="font-semibold text-blue-900 mb-3">Demo Credentials</div>
    <div className="mb-4">
      <strong>User</strong><br />
      Email: <code>user@example.com</code><br />
      Password: <code>user</code>
    </div>
    <div>
      <strong>Admin</strong><br />
      Email: <code>admin@gmail.com</code><br />
      Password: <code>admin</code>
    </div>
  </div>

  {/* Login Form */}
  <form
    onSubmit={handleLogin}
    className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl ring-1 space-y-6 animate-fade-in max-w-sm w-full"
  >
    <h2 className="text-3xl font-extrabold text-black text-center tracking-tight">
      Welcome Back
    </h2>

    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <div className="space-y-4">
      <button
        type="submit"
        className="w-full py-3 font-semibold rounded-lg bg-indigo-700 text-white"
      >
        Log In
      </button>
      <button
        type="button"
        onClick={() => navigate("/signup")}
        className="w-full py-3 font-medium rounded-lg bg-transparent border-2 border-indigo-400 text-indigo-600"
      >
        New here? Sign Up
      </button>
    </div>
  </form>
</div>

  );
}
