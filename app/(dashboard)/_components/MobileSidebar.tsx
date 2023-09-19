import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import Sidebar from "./Sidebar";

type Props = {};

const MobileSidebar = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-primary-foreground w-56">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
