"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "./components/posts";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import React from "react";

const queryClient = new QueryClient();
export default function Home() {
  const [searchValue, setSearchValue] = React.useState<string>(""); // [1]
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full flex flex-col mt-20 items-center pb-20">
        <div className="flex justify-between font-bold my-8 w-9/12">
          <h1 className="text-6xl order-first">Нийтлэлүүд</h1>
          <Input
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
            }}
            isClearable
            size="md"
            radius="lg"
            className="max-w-[300px] order-last"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Хайх нийтлэлээ эндээс..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <Posts searchValue={searchValue} />
      </div>
    </QueryClientProvider>
  );
}
