import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../features/studentSlice";
import { Link } from "react-router-dom";

function StudentList() {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <Link to={`/edit/${s.id}`}>
                  <button className="btn-edit">Edit</button>
                </Link>
                <button
                  className="btn-danger"
                  onClick={() => dispatch(deleteStudent(s.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;