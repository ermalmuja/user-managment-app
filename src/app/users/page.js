"use client";
import Link from "next/link";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function page() {
  const [apiUsers, setApiUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const [sortActive, setSortActive] = useState(false);

  async function getUsersData() {
    const url = "https://jsonplaceholder.typicode.com/users";
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setApiUsers(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getUsersData();
  }, []);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("localUsers");
      if (raw) setLocalUsers(JSON.parse(raw));
    } catch {
      localStorage.removeItem("localUsers");
    }
  }, []);

  const users = [...localUsers, ...apiUsers];

  const q = search.toLowerCase().trim();
  const filtered = q
    ? users.filter((u) => {
        const company = u.company?.name || "";
        return (
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q) ||
          company.toLowerCase().includes(q)
        );
      })
    : users;

  const finalList = sortActive
    ? [...filtered].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", undefined, {
          sensitivity: "base",
        })
      )
    : filtered;

  function handleAddUser(e) {
    if (!name.trim() || !email.trim()) return;

    const newUser = {
      id: "local-" + Date.now(),
      name: name.trim(),
      email: email.trim(),
    };

    const next = [newUser, ...localUsers];
    setLocalUsers(next);
    localStorage.setItem("localUsers", JSON.stringify(next));

    setName("");
    setEmail("");
    setOpen(false);
  }
  return (
    <div className="p-5 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant={sortActive ? "default" : "outline"}
          onClick={() => setSortActive((prev) => !prev)}
        >
          {sortActive ? "Sorted A → Z" : "Sort A → Z"}
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">+ Add User</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddUser}>
              <DialogHeader>
                <DialogTitle>Add new user to local storage</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 mt-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>

              <DialogFooter className="mt-4 gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {finalList.length > 0 ? (
          finalList.map((user) => (
            <Card key={String(user.id)} className="w-full">
              <CardHeader>
                <CardTitle>User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="opacity-70">Name:</p>
                    <p className="font-medium text-right">{user.name}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="opacity-70">Email:</p>
                    <p className="font-medium text-right">{user.email}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="opacity-70">Company:</p>
                    <p className="font-medium text-right">
                      {user.company?.name || "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
              {user.company ? (
                <CardFooter className="flex-col gap-2">
                  <Link href={`/users/${user.id}`} className="w-full">
                    <Button className="w-full">See user details</Button>
                  </Link>
                </CardFooter>
              ) : (
                <CardFooter className="flex-col gap-2">
                  <Button disabled className="w-full">
                    This is placed in locad storage
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default page;
