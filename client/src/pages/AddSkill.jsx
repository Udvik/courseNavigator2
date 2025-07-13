import React, { useState } from "react";

export default function AddSkill(){
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddSkill = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await res.json();
    alert(data.message);
    setName("");
    setDescription("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin – Add New Skill</h2>

      <form
        onSubmit={handleAddSkill}
        className="bg-white shadow p-6 rounded w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Skill Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Skill Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
}