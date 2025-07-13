import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
  setIsAdmin(isAdmin);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // call parent function to filter cards
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isProfilePage = location.pathname === "/profile";

  return (
    <nav className=" shadow px-6 py-3 flex justify-between"
    style={{backgroundColor: "#FFCED6"}}>
      <h1
        className="text-2xl font-bold text-black cursor-pointer"
        onClick={() => navigate("/home")}
      >
        CourseNavigator
      </h1>

      {!isProfilePage && (<input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search skills..."
        className="bg-gray-100 border px-3 ml-200 py-1 rounded w-64 text-black"
      />)}

      <div className="flex gap-5 ml-10">
        {isAdmin && (
          <>
            <button
              onClick={() => navigate("/admin/add-skill")}
              className="text-white bg-green-600 rounded font-semibold"
            >
              Add Skill
            </button>
            <button
              onClick={() => navigate("/admin/add-course")}
              className="text-white bg-green-600 rounded font-semibold"
            >
              Add Course
            </button>
          </>
        )}

        {!isAdmin && (
          isProfilePage ? (
            <button
              onClick={() => navigate("/home")}
              className="text-white font-semibold bg-blue-600 px-2 py-1 rounded"
            >
              Home
            </button>
          ) : (
            <button
              onClick={() => navigate("/profile")}
              className="text-white font-semibold bg-blue-600 px-2 py-1 rounded"
            >
              Profile
            </button>
          )
        )}

        <button
          onClick={handleLogout}
          className="text-white font-semibold bg-red-600  px-2 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
