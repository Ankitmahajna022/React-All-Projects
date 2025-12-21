export default function Skills() {
  const skills = [
    "HTML", "CSS", "Boostrap","JavaScript",
    "React", "Node.js", "Express",
    "MongoDB", "Firebase", "Git"
  ];

  return (
    <section className="fade-up">
      <h2>Skills</h2>
      <div style={styles.grid}>
        {skills.map(skill => (
          <span key={skill} style={styles.badge}>{skill}</span>
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: { display: "flex", flexWrap: "wrap", gap: "10px" },
  badge: {
    background: "#1e293b",
    padding: "10px 15px",
    borderRadius: "8px"
  }
};
