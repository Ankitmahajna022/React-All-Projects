import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchUser } from "../../Slices/userSlice"; // adjust path
import { setActiveChat } from "../../Slices/chatSlice"; // adjust path
import "./User.css";

function User() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ListGroup as="ol" numbered>
        {users.map((user) => (
          <ListGroup.Item
            as="li"
            key={user.id}
            className="d-flex justify-content-between align-items-start"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(setActiveChat(user))} // 👈 open chat on click
          >
            <div className="ms-2 me-auto">
              <h5 className="fw-bold">{user.name}</h5>
              <small>{user.email}</small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default User;
