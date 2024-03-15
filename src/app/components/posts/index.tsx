"use client";
export interface LikesResponse {
  status: number;
  message: string;
  data: number;
}

export interface PostResponse {
  status: number;
  message: string;
  data: RPost[];
}

export interface RPost {
  Id: number;
  UserId: number;
  Title: string;
  Content: string;
  Likes: number;
  CategoryId: number;
  IsPublished: boolean;
  created_at: string;
  Updated_at: string;
  Deleted_at: string;
  UserEmail: string;
  UserName: string;
}
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SinglePost } from "../singlePost";
import { BACKEND_URL } from "@/app/provider";
import Loading from "../loader";
import PostContent from "../postcontent";
import { CategoryList } from "../categoryList";

export interface CategoriesListResponse {
  status: number;
  message: string;
  data: Category[];
}

export interface Category {
  Id: number;
  Name: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface PostsProps {
  searchValue: string;
}

export default function Posts({ searchValue }: PostsProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null,
  );
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/posts/published`, {}).then(
        (res) => res.json() as Promise<PostResponse>,
      ),
  });

  const {
    isPending: catIsPending,
    error: catError,
    data: catData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/categories`, {}).then(
        (res) => res.json() as Promise<CategoriesListResponse>,
      ),
  });

  if (isPending) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  if (!data.data) return "Дата байдгүй ээ";

  return (
    <div className="flex flex-col items-center">
      <CategoryList
        categories={catData?.data}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex flex-row flex-wrap w-9/12 gap-2">
        {data.data
          .filter(
            (post: RPost) =>
              searchValue === "" ||
              post.Title.toLowerCase().includes(searchValue.toLowerCase()) ||
              post.Content.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .filter(
            (post: RPost) =>
              !selectedCategory || post.CategoryId === selectedCategory,
          )
          .sort((a: RPost, b: RPost) => a.Id - b.Id)
          .sort((a: RPost, b: RPost) => b.Likes - a.Likes)
          .map((article: RPost) => (
            <SinglePost
              key={article.Id}
              id={article.Id}
              likes={article.Likes}
              title={article.Title}
              content={article.Content}
              isPublished={article.IsPublished}
              categoryId={article.CategoryId}
              userName={article.UserName}
              userEmail={article.UserEmail}
            />
          ))}
      </div>
    </div>
  );
}
