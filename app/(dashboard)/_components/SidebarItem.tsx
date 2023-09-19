"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const SidebarItem = ({ icon: Icon, label, href }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => router.push(href);
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center justify-between gap-x-2 text-sm font-[500px] pl-6 transition-all  hover:bg-secondary/50",
        isActive &&
          "text-brand bg-secondary hover:bg-secondary hover:text-brand-accent "
      )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-muted-foreground", isActive && "text-brand")}
        />
        {label}
      </div>
      <div
        className={cn(
          "h-16 opacity-0 border-2 border-brand  transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
