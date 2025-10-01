"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const params = useParams();

  const [user, setUser] = useState();

  async function getUserData() {
    const url = `https://jsonplaceholder.typicode.com/users/${params.userId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  if (user === undefined) {
    return <div>Loading...</div>;
  }
  return <div>{user?.name}</div>;
}

export default page;
