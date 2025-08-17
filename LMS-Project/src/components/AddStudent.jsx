import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../features/studentSlice";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      name,
      email,
    };
    dispatch(addStudent(newStudent));
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit" className="btn-primary">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;