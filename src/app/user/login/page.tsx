"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { fiboLogin, LoginResponseSuccess } from "./data";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // import js-cookie
export interface Login {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const onSubm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const login: Login = {
      email: email,
      password,
    };
    let res = (await fiboLogin(login)) as LoginResponseSuccess;
    if (res.status === 401) {
      setError("Invalid credentials");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 5000);
      return;
    }
    if (res.status === 200) {
      if (!res.data?.token) {
        return;
      }
      Cookies.set("token", res?.data.token);
      router.push("/dashboard");
    }
  };
  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="flex flex-col items-center mt-40">
        <h1 className="text-6xl font-extrabold mb-20 text-indigo-300">
          Нэвтрэх
        </h1>
        <form onSubmit={onSubm} className="w-52">
          <Input
            variant="bordered"
            placeholder="Нэр"
            value={email}
            onValueChange={setEmail}
            className="mb-2"
          />
          <Input
            variant="bordered"
            placeholder="Нууц үг"
            value={password}
            onValueChange={setPassword}
            type="password"
            className="mb-2"
          />
          <Button
            type="submit"
            className="w-full"
            color={isError ? "danger" : "primary"}
          >
            Нэвтрэх
          </Button>
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </form>
      </div>
    </div>
  );
}
