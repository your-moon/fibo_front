"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { HeartIcon } from "./heartIcon";
import { BACKEND_URL } from "@/app/provider";
import Cookie from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { SingleCatResponse } from "../editSinglePost";
export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

interface SinglePostProps {
  id: number;
  likes: number;
  title: string;
  content: string;
  isPublished: boolean;
  categoryId: number;
  userName: string;
  userEmail: string;
}

export const SinglePost = ({
  id,
  likes,
  title,
  content,
  isPublished,
  categoryId,
  userName,
  userEmail,
}: SinglePostProps) => {
  const randomNum = randomIntFromInterval(1, 8);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(likes);
  const [catName, setCatName] = useState<string>(""); // [1]

  const { isPending, error, data } = useQuery({
    queryKey: ["cats"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/categories/${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json() as Promise<SingleCatResponse>),
  });

  useEffect(() => {
    if (data && data.data) {
      setCatName(data.data.Name); // [2]
    }
  }, [data]);

  if (isPending) return <Spinner color="success" className="mx-5" />;

  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  return (
    <Card
      as={Link}
      href={`/posts/${id}`}
      className="flex-auto min-w-72 max-w-96 max-h-80 min-h-44 mx-1 mb-2"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={`https://picsum.photos/200/300`}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="w-28 text-small font-semibold leading-none text-default-600 text-ellipsis overflow-hidden ...">
              {userName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{userEmail}
            </h5>
          </div>
        </div>
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          onPress={async () => {
            const res = await fetch(`${BACKEND_URL}/posts/like/${id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${Cookie.get("token")}`,
              },
              body: JSON.stringify({
                likes: isLiked ? likesCount - 1 : likesCount + 1,
              }),
            });
            if (res.ok) {
              setIsLiked(!isLiked);
              setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <HeartIcon filled={isLiked} />
        </Button>
      </CardHeader>
      <CardBody className="px-4 py-0 text-3xl max-h-20 text-semibold text-default-600 text-ellipsis overflow-hidden ...">
        <p>{title}</p>
      </CardBody>
      <CardFooter className="gap-3 ">
        <div className="flex gap-10 w-full">
          <div className="flex flex-row w-1/2 left-0">
            <p className="font-semibold text-default-400 text-small mr-1">
              {likesCount}
            </p>
            <p className=" text-default-400 text-small">Likes</p>
          </div>
          <p className=" text-default-400 text-small right-0 float-right ">
            @{catName}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
