import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>
          <h6>{`${user.name}`}</h6>
          <i>{`${user.email}`}</i>
        </li>
      ))}
    </ul>
  );
}
