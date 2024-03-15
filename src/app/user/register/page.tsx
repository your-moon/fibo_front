"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { fiboRegister, RegisterResponseSuccess } from "./data";
import { useRouter } from "next/navigation";
import { LoginResponseSuccess, fiboLogin } from "../login/data";
import { Login } from "../login/page";
import Cookies from "js-cookie";
export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isInvalid, setIsInvalid] = React.useState(false);
  const onSubm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const register: Register = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password,
    };
    console.log(register);
    let res = await fiboRegister(register);
    console.log(res);
    if (res.status === 409 || res.status === 400) {
      setError(res.message);
      setIsInvalid(true);
    }

    if (res.status === 200) {
      const login: Login = {
        email: email,
        password,
      };

      let res = (await fiboLogin(login)) as LoginResponseSuccess;
      if (res.status === 200) {
        if (!res.data?.token) {
          return;
        }
        Cookies.set("token", res?.data.token);
        router.push("/dashboard");
      }
    }
  };
  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="flex flex-col items-center mt-40">
        <h1 className="text-6xl font-extrabold mb-20 text-emerald-400">
          Бүртгүүлэх
        </h1>
        <form onSubmit={onSubm} className="w-52">
          <Input
            variant="bordered"
            placeholder="Нэр"
            value={firstName}
            onValueChange={setFirstName}
            className="mb-2"
          />
          <Input
            variant="bordered"
            placeholder="Овог"
            value={lastName}
            onValueChange={setLastName}
            className="mb-2"
          />
          <Input
            variant="bordered"
            placeholder="Э-мэйл"
            value={email}
            onValueChange={setEmail}
            isInvalid={isInvalid}
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
          <p className="text-red-500 my-2">{error}</p>
          <Button type="submit" className="w-full">
            Бүртгүүлэх
          </Button>
        </form>
      </div>
    </div>
  );
}
