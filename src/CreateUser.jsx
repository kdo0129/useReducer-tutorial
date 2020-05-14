import React from "react";

const CreateUser = ({ username, age, onCreate, onChange }) => {
  console.log("createUser 렌더링");
  return (
    <>
      <input onChange={onChange} value={username} name="username" type="text" />
      <input onChange={onChange} value={age} name="age" type="number" />
      <button onClick={onCreate}>추가</button>
    </>
  );
};

export default React.memo(CreateUser);
