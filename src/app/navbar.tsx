import React from "react";
import {
  Button,
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { cookies } from "next/headers";

export default function Navbar() {
  if (!cookies().has("token")) {
    return (
      <NavbarComponent>
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">FIBO</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Нийтлэл
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/user/login">Нэвтрэх</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/user/register"
              variant="flat"
            >
              Бүртгүүлэх
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NavbarComponent>
    );
  }

  return (
    <NavbarComponent>
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">FIBO</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Нийтлэл
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard" aria-current="page">
            BackOffice
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/user/write">
            Бичих
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/admin">
            Админ
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="danger"
            href="/"
            variant="flat"
            onClick={async () => {
              "use server";
              cookies().delete("token");
            }}
          >
            Гарах
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarComponent>
  );
}
