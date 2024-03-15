"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { PostResponse } from "../components/posts";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { BACKEND_URL } from "../provider";
import Loading from "../components/loader";
import { BigCard } from "../components/bigcard";
import Authors from "../components/admin/authors";
import AdminPosts from "../components/admin/posts";
import { AllUserResponse } from "../actions/models/user";

const queryClient = new QueryClient();
export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Admin />
    </QueryClientProvider>
  );
}

function Admin() {
  const token = Cookie.get("token");
  const {
    isPending,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }).then((res) => res.json() as Promise<AllUserResponse>),
  });

  const {
    isPending: isPostsPending,
    error: postsError,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }).then((res) => res.json() as Promise<PostResponse>),
  });

  useEffect(() => {
    if (users) {
      console.log(users.data);
    }
  });

  if (isPending) return <Loading />;
  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  if (!users.data) return <div>Дата байдгүй ээ </div>;

  if (!token) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Та нэвтрээгүй байна.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-20 items-center pb-20">
      <div className="w-9/12">
        <div className="flex flex-row flex-wrap ">
          <BigCard
            title="Нийт хэрэглэгч"
            value={users.data.length}
            valueColor="text-violet-300"
          />
          <BigCard
            title="Нийт нийтлэлүүд"
            value={posts?.data.length}
            valueColor="text-emerald-400"
          />
        </div>
        <h1 className="text-4xl font-bold my-6">Нийт хэрэглэгч нар</h1>
        <Authors getUsers={users.data} />
        <h1 className="text-4xl font-bold my-6">Нийт нийтлэлүүд</h1>
        <AdminPosts
          isPending={isPostsPending}
          error={postsError}
          data={posts?.data}
        />
      </div>
    </div>
  );
}
