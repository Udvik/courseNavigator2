import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password }),
});
const data = await res.json();
    if (res.ok) {
      alert("Signup successful! You can now log in.");
      // Optionally redirect to login page
      // navigate("/login");
    } else {
      alert(data.error || "Signup failed");
    }
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center "
    style={{backgroundColor: "#1e293b"}}>
      <form
        onSubmit={handleSignup}
        className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl ring-1 space-y-6 animate-fade-in"
        
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 border rounded items-center"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
