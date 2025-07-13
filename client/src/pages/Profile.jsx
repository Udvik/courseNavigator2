import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCompleteCourse = async (courseId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/complete/${courseId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      alert(data.message || "Marked as completed!");
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Error completing course");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white/80 rounded-lg shadow p-6 mb-8">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
      <hr className="my-6 border-t-2 border-blue-200" />

      <h2 className="text-xl font-semibold mb-4 mt-8 pl-3 py-1 border-l-4 border-blue-500 bg-blue-50 text-blue-800 rounded">Started Courses</h2>
      <div className="max-w-11/16">
        <ul>
          {profile.startedCourses.length === 0 ? (
            <li className="text-gray-500 italic">No started courses yet.</li>
          ) : (
            profile.startedCourses.map(course => (
              <li
                key={course._id}
                className="flex items-center mb-2 gap-x-4 "
              >
                <span className="flex-1 truncate">{course.name}</span>
                <button
                  onClick={() => handleCompleteCourse(course._id)}
                  className="w-32 h-10 bg-blue-600 text-white rounded text-center text-sm"
                >
                  Mark as Completed
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <h2 className="text-xl font-semibold mb-4 mt-8 pl-3 py-1 border-l-4 border-green-500 bg-green-50 text-green-800 rounded">
        Completed Courses
      </h2>      <div className="max-w-11/16">
        <ul>
          {profile.completedCourses.length === 0 ? (
            <li className="text-gray-500 italic">No completed courses yet.</li>
          ) : (
            profile.completedCourses.map(course => (
              <li
                key={course._id}
                className="flex items-center mb-2 gap-x-4 "
              >
                <span className="flex-1 truncate ">{course.name}</span>
                <button
                  onClick={() => navigate(`/test/${course._id}`)}
                  className="w-32 h-8 bg-green-600 text-white rounded text-center"
                >
                  Take Test
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
