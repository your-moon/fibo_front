"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { HeartIcon } from "./heartIcon";
import PostContent from "../postcontent";
import { BACKEND_URL } from "@/app/provider";
import Cookie from "js-cookie";

interface SinglePostProps {
  id: number;
  likes: number;
  title: string;
  content: string;
  isPublished: boolean;
}

export const SinglePost = ({
  id,
  likes,
  title,
  content,
  isPublished,
}: SinglePostProps) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(likes);

  return (
    <Card
      as={Link}
      href={`/posts/${id}`}
      className="h-40 max-h-80 min-w-[260px] max-w-[300px] mx-1 mb-2"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="w-28 text-small font-semibold leading-none text-default-600 text-ellipsis overflow-hidden ...">
              {title}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @zoeylang
            </h5>
          </div>
        </div>
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          onPress={async () => {
            const res = await fetch(`${BACKEND_URL}/posts/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${Cookie.get("token")}`,
              },
              body: JSON.stringify({
                title: title,
                content: content,
                likes: isLiked ? likesCount - 1 : likesCount + 1,
                is_published: isPublished,
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
      <CardBody className="px-4 py-0 text-small text-default-400">
        <PostContent content={content} />
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {likesCount}
          </p>
          <p className=" text-default-400 text-small">Likes</p>
        </div>
      </CardFooter>
    </Card>
  );
};
