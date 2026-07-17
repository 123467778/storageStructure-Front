import { useState } from "react";

function SearchableList() {
  const [search, setSearch] = useState("");

  const users = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
  ];

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchableList;