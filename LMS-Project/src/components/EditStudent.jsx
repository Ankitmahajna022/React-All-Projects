import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStudent } from "../features/studentSlice";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const student = useSelector((state) =>
    state.students.find((s) => s.id === parseInt(id))
  );
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ id: student.id, name, email }));
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edit Student</h2>
      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit" className="btn-edit">Update</button>
      </form>
    </div>
  );
}

export default EditStudent;