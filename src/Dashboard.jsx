import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard({ username }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h6>Welcome {username}</h6>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            <h6>{`${user.name}`}</h6>
            <i>{`${user.email}`}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}
