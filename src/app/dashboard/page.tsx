"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Draft from "../components/myPosts";
import MyPublishedPosts from "../components/myPublishedPosts";
import { LikesResponse, PostResponse } from "../components/posts";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { BACKEND_URL } from "../provider";
import Loading from "../components/loader";
import { BigCard } from "../components/bigcard";
import { SingleUserResponse } from "../actions/models/user";
import React from "react";

const queryClient = new QueryClient();
export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

function Dashboard() {
  const [reputation, setReputation] = React.useState(0);
  const [totalLikes, setTotalLikes] = React.useState(0);
  const token = Cookie.get("token");
  const {
    isPending: likesIsPending,
    error: likesError,
    data: likes,
  } = useQuery({
    queryKey: ["likes"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/posts/me/likes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }).then((res) => res.json() as Promise<LikesResponse>),
  });
  const {
    isPending: userIsPending,
    error: userError,
    data: user,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }).then((res) => res.json() as Promise<SingleUserResponse>),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/users/me/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }).then((res) => res.json() as Promise<PostResponse>),
  });

  useEffect(() => {
    if (data) {
      console.log(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (user?.data) {
      setReputation(user.data.reputation);
      if (user.data.reputation == 0) {
        setReputation(1);
      }
    }
  }, [user]);

  useEffect(() => {
    if (likes) {
      setTotalLikes(likes.data);
      if (likes.data === 0) {
        setTotalLikes(1);
      }
    }
  }, [likes]);

  if (userIsPending || likesIsPending) return <Loading />;

  if (isPending) return <Loading />;
  if (error)
    return (
      <div className="mx-64 mt-12 pb-20">
        <h2 className="mx-12 my-5">{error.message}</h2>
        <div className="flex flex-row ">
          <BigCard
            title="Reputation Оноо"
            value=""
            valueColor="text-violet-300"
          />
          <BigCard title="Сарын цалин" value="" valueColor="text-emerald-400" />
        </div>
        <h1 className="text-4xl font-bold my-6">Нийтлэгдсэн пост-ууд</h1>
        <p>Дата байдгүй ээ</p>
        <h1 className="text-4xl font-bold my-6">Хадгалагдсан пост-ууд</h1>
        <p>Дата байдгүй ээ</p>
      </div>
    );
  if (!token) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Та нэвтрээгүй байна.</h1>
      </div>
    );
  }

  if (!data.data)
    return (
      <div className="mx-64 mt-12 mb-20">
        <div className="flex flex-row ">
          <BigCard
            title="Reputation Оноо"
            value=""
            valueColor="text-violet-300"
          />
          <BigCard title="Сарын цалин" value="" valueColor="text-emerald-400" />
        </div>
        <h1 className="text-4xl font-bold my-6">Нийтлэгдсэн пост-ууд</h1>
        <p>Дата байдгүй ээ</p>
        <h1 className="text-4xl font-bold my-6">Хадгалагдсан пост-ууд</h1>
        <p>Дата байдгүй ээ</p>
      </div>
    );

  return (
    <div className="flex flex-col mt-20 items-center pb-20">
      <div className="w-9/12 ">
        <div className="flex flex-row ">
          <BigCard
            title="Reputation Оноо"
            value={
              totalLikes * 0.12 > 0 ? `${totalLikes * 0.12}` : "Calculating"
            }
            valueColor="text-violet-300"
          />
          <BigCard
            title="Сарын цалин"
            value={
              reputation * totalLikes > 0
                ? `${reputation * totalLikes}$`
                : "Calculating"
            }
            valueColor="text-emerald-400"
          />
          <BigCard
            title="Нийт лайк"
            value={totalLikes}
            valueColor="text-blue-400"
          />
        </div>
        <h1 className="text-4xl font-bold my-6">Нийтлэгдсэн пост-ууд</h1>
        <MyPublishedPosts data={data.data} />
        <h1 className="text-4xl font-bold my-6">Хадгалагдсан пост-ууд</h1>
        <Draft data={data.data} />
      </div>
    </div>
  );
}
