"use client";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { IconType } from "react-icons";

type Props = {
  item: Category;
  icon: IconType;
};

const CategoryItem = ({ item, icon: Icon }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === item.id;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: isSelected ? null : currentTitle,
          categoryId: isSelected ? null : item.id,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Button
      variant={isSelected ? "brand" : "ghost"}
      type="button"
      onClick={onClick}>
      {Icon && <Icon size={20} />}
      <div className="truncate ml-2">{item.name}</div>
    </Button>
  );
};

export default CategoryItem;
