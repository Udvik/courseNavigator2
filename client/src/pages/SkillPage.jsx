import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SkillPage() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    minRating: 0,
    category: "All",
    language: "All",
    certification: false,
    duration: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setFiltered(data);
      });
  }, [id]);

  useEffect(() => {
    let result = [...courses];

    if (filters.price !== "") {
      const priceLimit = parseInt(filters.price.replace(/[^0-9]/g, "")) || 0;

      result = result.filter((c) => {
        const coursePrice = c.price.toLowerCase();

        if (priceLimit === 0) {
          return coursePrice.includes("free") || coursePrice === "0";
        }

        const numericPrice = parseInt(coursePrice.replace(/[^0-9]/g, "")) || 0;
        return numericPrice <= priceLimit || coursePrice.includes("free");
      });
    }


    if (filters.minRating) {
      result = result.filter((c) => c.rating >= filters.minRating);
    }

    if (filters.category !== "All") {
      result = result.filter((c) => c.category === filters.category);
    }

    if (filters.language !== "All") {
      result = result.filter((c) => c.language === filters.language);
    }

    if (filters.certification) {
      result = result.filter((c) => c.certification === true);
    }

    if (filters.duration) {
      result = result.filter((c) => c.duration <= filters.duration);
    }

    setFiltered(result);
  }, [filters, courses]);

  const uniqueValues = (data, key) => [...new Set(data.map((c) => c[key]).filter(Boolean))];

  const handleStartCourse = async (courseId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/start/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      console.log(data);
      alert(data.message || "Course started!");
    } catch (err) {
      console.error("Failed to mark course as started:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      


      <div style={{ backgroundColor: "#D3FFFE" }} className="mb-6 p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mb-6">

        <input
          type="text"
          placeholder="Max Price (₹)"
          className="p-2 border rounded"
          onChange={(e) =>
            setFilters({ ...filters, price: e.target.value })
          }
        />

        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Min Rating"
          className="p-2 border rounded"
          onChange={(e) =>
            setFilters({ ...filters, minRating: parseFloat(e.target.value) || 0 })
          }
        />

        <select
          className="p-2 border rounded"
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option>All</option>
          {uniqueValues(courses, "category").map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          onChange={(e) =>
            setFilters({ ...filters, language: e.target.value })
          }
        >
          <option>All</option>
          {uniqueValues(courses, "language").map((lang, i) => (
            <option key={i}>{lang}</option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) =>
              setFilters({ ...filters, certification: e.target.checked })
            }
          />
          Only Certification
        </label>

        <input
          type="number"
          placeholder="Max Duration (hrs)"
          className="p-2 border rounded"
          onChange={(e) =>
            setFilters({ ...filters, duration: parseInt(e.target.value) || 0 })
          }
        />
      </div>
      </div>

      {/* 🧠 Course List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <p className="col-span-full text-gray-600">No courses match the selected filters.</p>
        ) : (
          filtered.map((c, i) => (
            <div key={i} className="bg-black p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-blue-600">{c.name}</h3>
              <p className="text-sm text-gray-600">
                {c.category} • {c.duration} hrs • {c.language}
              </p>
              <p className="text-sm">
                Price: {c.price} • Rating: ⭐ {c.rating} • Certification:{" "}
                {c.certification ? "Yes" : "No"}
              </p>
              <a
                href={c.link}
                target="_blank"
                className="text-blue-500 underline"
              >
                View Course →
              </a>
              <button
                onClick={() => handleStartCourse(c._id)}
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Start Course
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
