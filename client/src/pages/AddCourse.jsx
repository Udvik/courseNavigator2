import { useEffect, useState } from "react";

export default function AddCourse() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    skillId: "",
    name: "",
    category: "YouTube",
    price: "Free",
    rating: 0,
    language: "English",
    certification: false,
    duration: "",
    link: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || "Course added");
    setForm({ ...form, name: "", duration: "", link: "" });
  };

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Admin – Add Course</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow"
      >
        <select
          name="skillId"
          value={form.skillId}
          onChange={handleChange}
          required
          className="border p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-48 overflow-y-auto"
        >
          <option value="" className="bg-gray-100 text-gray-700">
            Select Skill
          </option>
          {skills.map((s) => (
            <option
              key={s._id}
              value={s._id}
              className="bg-white text-black hover:bg-blue-100"
            >
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Course Name"
          className="border p-2 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded bg-white text-black"
        >
          <option>YouTube</option>
          <option>Coursera</option>
          <option>GeeksforGeeks</option>
          <option>NPTEL</option>
          <option>Infosys Springboard</option>
          <option>W3Schools</option>
          <option >Udemy</option>
          <option >Udacity</option>
          
        </select>

        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (e.g., Free or ₹499)"
          className="border p-2 rounded"
        />

        <input
          type="number"
          step="0.1"
          max="5"
          min="0"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (0–5)"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="language"
          value={form.language}
          onChange={handleChange}
          placeholder="Language (e.g., English)"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (e.g., 4 weeks)"
          className="border p-2 rounded"
        />

        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Course URL"
          className="border p-2 rounded"
          required
        />

        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="certification"
            checked={form.certification}
            onChange={handleChange}
          />
          Certification Provided
        </label>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
