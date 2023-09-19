"use client";
import React from "react";
import { Layout, Compass, ListIcon, BarChart2Icon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

type Props = {};

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: ListIcon,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart2Icon,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = (props: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
