"use client";
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { RPost } from "../../posts";
import React, { useEffect } from "react";

interface AdminPostsProps {
  isPending: boolean;
  error: any;
  data: RPost[] | undefined;
}

export default function AdminPosts({
  isPending,
  error,
  data,
}: AdminPostsProps) {
  const [publishedPostIds, setPublishedPostIds] = React.useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const publishedPosts = data.filter((post) => post.IsPublished);
      const publishedPostIds = publishedPosts.map((post) => post.Id.toString());
      setPublishedPostIds(publishedPostIds);
      console.log(publishedPostIds);
    }
  }, [data]);
  if (isPending) return <Spinner color="success" className="mx-5" />;

  if (error) return <Table>{error.message}</Table>;
  return (
    <Table
      key={publishedPostIds.join(",")}
      aria-label="posts table"
      isStriped
      defaultSelectedKeys={publishedPostIds}
    >
      <TableHeader>
        <TableColumn>Нэр</TableColumn>
        <TableColumn>Э-мэйл</TableColumn>
        <TableColumn>Гарчиг</TableColumn>
        <TableColumn>Ангилал</TableColumn>
        <TableColumn>Нийтлэгдсэн</TableColumn>
      </TableHeader>
      <TableBody items={data}>
        {(item: RPost) => (
          <TableRow key={item.Id}>
            <TableCell>{item.UserName}</TableCell>
            <TableCell>{item.UserEmail}</TableCell>
            <TableCell>{item.Title}</TableCell>
            <TableCell>{item.CategoryId}</TableCell>
            <TableCell>
              {item.IsPublished ? "Нийтлэгдсэн" : "Нийтлэгдээгүй"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
