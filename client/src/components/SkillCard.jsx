import { useNavigate } from "react-router-dom";

export default function SkillCard({ skill }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/skill/${skill._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded p-4 shadow hover:shadow-lg cursor-pointer transition bg-white"
    >
      <h2 className="text-xl font-bold text-blue-600">{skill.name}</h2>
      <p className="text-gray-600">{skill.description}</p>
    </div>
  );
}
