import React from "react";

const User = React.memo(({ user, onRemove, onToggle }) => {
  console.log("User 렌더링");
  return (
    <>
      <div>
        <span
          style={{
            cursor: "pointer",
            color: user.active ? "red" : "#000"
          }}
          onClick={() => {
            onToggle(user.id);
          }}
        >
          username: {user.username}, age: {user.age}{" "}
        </span>
        <button
          onClick={() => {
            onRemove(user.id);
          }}
        >
          삭제
        </button>
      </div>
    </>
  );
});

const UserList = ({ users, onRemove, onToggle }) => {
  console.log("UserList 렌더링");
  return (
    <>
      {users.map(user => {
        return (
          <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        );
      })}
    </>
  );
};

export default React.memo(UserList);
