import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StudentList from "../src/components/StudentList";
import AddStudent from "../src/components/AddStudent";
import EditStudent from "../src/components/EditStudent";

function App() {
  return (
    <div className="p-4">
      <nav>
        <Link to="/">Students</Link> | <Link to="/add">Add Student</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
