import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";

export default function Home() {
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/skills")
    .then((res) => res.json())
    .then((data) => {
      setAllSkills(data);
      setFilteredSkills(data);
    });
}, []);


  const handleSearch = (query) => {
    const result = allSkills.filter((skill) =>
      skill.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSkills(result);
  };

  return (
    <>
      <Navbar skills={allSkills} onSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filteredSkills.map((skill, idx) => (
          <SkillCard key={idx} skill={skill} />
        ))}
      </div>
    </>
  );
}
