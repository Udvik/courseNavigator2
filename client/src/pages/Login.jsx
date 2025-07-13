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
    <div className="min-h-screen flex items-center justify-center  p-6 "
    style={{backgroundColor: "#1e293b"}}>
      <form
        onSubmit={handleLogin}
        className=" bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl ring-1  space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-black text-center tracking-tight">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded items-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded items-center"
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
            className="w-full py-3 font-medium rounded-lg bg-transparent border-2 border-indigo-400 text-indigo-600 "
          >
            New here? Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
