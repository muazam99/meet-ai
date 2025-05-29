"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Alert } from "@/components/ui/alert";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const {  data: session } = authClient.useSession() 

  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password, 
        name, 
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          Alert({
            title: "Success",
            content: "User created successfully",
          })
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  if(session) {
    return (
      <div className="p-4 gap-y-4 flex flex-col">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>  
    )
  }

  return (
    <div className="p-4 gap-y-4 flex flex-col">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
