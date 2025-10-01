"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function page() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  async function getUsersData() {
    const url = "https://jsonplaceholder.typicode.com/users";
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 mb-4 rounded"
      />
      <div className="space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id}>
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default page;
