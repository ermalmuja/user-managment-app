"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
  return (
    <div className="flex items-center justify-center h-full">
      <Card key={user.id} className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-5">
              <p>Address:</p>{" "}
              <p className="text-end">{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p>Phone:</p> <p>{user.phone}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p>Website:</p> <p>{user.website}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            See user details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default page;
