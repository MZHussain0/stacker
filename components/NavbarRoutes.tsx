"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

type Props = {};

const NavbarRoutes = (props: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-4 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button
              size={"sm"}
              variant={"ghost"}
              className="bg-muted hover:bg-brand hover:text-secondary transition-all">
              <LogOutIcon className="h-4 w-4 mr-2" /> Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"}>
            <Button
              className="bg-muted hover:bg-brand hover:text-secondary transition-all"
              size={"sm"}
              variant={"ghost"}>
              Teacher Mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
