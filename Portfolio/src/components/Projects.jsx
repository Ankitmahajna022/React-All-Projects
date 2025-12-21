export default function Projects() {
  return (
    <section className="fade-up">
      <h2>Projects</h2>

      <Project
        title="WhatsApp Chat App"
        link="https://github.com/Ankitmahajna022/React-All-Projects/tree/main/whatApp-Chat"
      />

      <Project
        title="Library Management System"
        link="https://github.com/HETVI1405/library-management-system/tree/main/library_management"
      />

      <Project
        title="Tweet Posting App"
        link="https://github.com/Ankitmahajna022/Node-js-project/tree/main/Tweet_Posting_App"
      />

      <Project
        title="Movie Management System"
        link="https://github.com/Ankitmahajna022/Node-js-project/tree/main/Movie_Management_System"
      />
    </section>
  );
}

function Project({ title, link }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <a href={link} target="_blank">View Code</a>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e293b",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px"
  }
};
