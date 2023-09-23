"use client";
import { Category } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import {
  FcAreaChart,
  FcCircuit,
  FcEngineering,
  FcLinux,
  FcMultipleDevices,
  FcMusic,
  FcPhotoReel,
  FcSportsMode,
} from "react-icons/fc";
import CategoryItem from "./CategoryItem";

type Props = {
  items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  Accounting: FcAreaChart,
  "Artificial Intelligence": FcCircuit,
  "Computer Science": FcMultipleDevices,
  Engineering: FcEngineering,
  Fitness: FcSportsMode,
  Music: FcMusic,
  Photography: FcPhotoReel,
  Programming: FcLinux,
};

const Categories = ({ items }: Props) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} item={item} icon={iconMap[item.name]} />
      ))}
    </div>
  );
};

export default Categories;
