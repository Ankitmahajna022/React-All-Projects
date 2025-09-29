import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { fetchUser, deleteUser } from "../../Slices/userSlice"; // adjust path
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
      <ListGroup as="ol" numbered>
        {users.map((user) => (
          <ListGroup.Item
            as="li"
            key={user.id}
            className="d-flex justify-content-between align-items-start"
             onDoubleClick={()=>dispatch(deleteUser(user.id))}
          >
            <div className="ms-2 me-auto">
              <h3 className="fw-bold">{user.name}</h3>
              
            </div>
           </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default User;
