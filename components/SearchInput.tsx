"use client";
import qs from "query-string";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

const SearchInput = (props: Props) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [currentCategoryId, debouncedValue, pathname, router]);

  return (
    <div className="relative">
      <SearchIcon className=" h-4 w-4 absolute top-3 left-3 text-brand" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full focus-visible:ring-brand"
        placeholder="Search for a course..."
      />
    </div>
  );
};

export default SearchInput;
