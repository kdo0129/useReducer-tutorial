import React, { useState, useRef, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

const countActiveUser = users => {
  console.log("카운트");
  return users.filter(user => user.active).length;
};

export default function App() {
  const [inputs, setInputs] = useState({
    username: "",
    age: ""
  });
  const { username, age } = inputs;

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Kim",
      age: 20
    },
    {
      id: 2,
      username: "Lee",
      age: "30"
    },
    {
      id: 3,
      username: "Choi",
      age: "40"
    }
  ]);

  const nextId = useRef(4);

  const onInputChange = useCallback(e => {
    const { value, name } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);

  const onCreate = useCallback(() => {
    const user = {
      username,
      age,
      id: nextId.current,
      active: false
    };
    setUsers(users => [...users, user]);
    setInputs({
      username: "",
      age: ""
    });
    nextId.current += 1;
  }, [username, age]);

  const onRemove = useCallback(id => {
    setUsers(users =>
      users.filter(user => {
        return user.id !== id;
      })
    );
  }, []);

  const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user => {
        return user.id === id ? { ...user, active: !user.active } : user;
      })
    );
  }, []);

  const count = useMemo(() => countActiveUser(users), [users]);

  return (
    <div>
      <CreateUser
        username={username}
        age={age}
        onChange={onInputChange}
        onCreate={onCreate}
      />
      <div>activeUser : {count}</div>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </div>
  );
}
