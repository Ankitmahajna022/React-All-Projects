import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { fetchUser } from "../../Slices/userSlice";
import { setActiveChat } from "../../Slices/chatSlice";
import "./User.css";

function User() {
  const dispatch = useDispatch();
  const { users, isLoading, error, currentUser } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="user-list">
      <h2>User List</h2>

      {!currentUser ? (
        <p>Please login first.</p>
      ) : isLoading ? (
        <div className="loading">
          <Spinner animation="border" size="sm" /> Loading users...
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : users.length === 0 ? (
        <p>No other users found.</p>
      ) : (
        <ListGroup as="ol" numbered>
          {users
            .filter((u) => u.email !== currentUser.email)
            .map((user) => {
              const chatId = [currentUser.email, user.email].sort().join("_");
              return (
                <ListGroup.Item
                  as="li"
                  key={user.id}
                  className="d-flex justify-content-between align-items-start user-item"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    dispatch(
                      setActiveChat({
                        id: chatId,
                        name: user.name,
                        email: user.email,
                      })
                    )
                  }
                >
                  <div className="ms-2 me-auto">
                    <h5 className="fw-bold">{user.name}</h5>
                    <small>{user.email}</small>
                  </div>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      )}
    </div>
  );
}

export default User;
