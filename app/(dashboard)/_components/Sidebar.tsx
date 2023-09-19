import React from "react";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="h-full border-r-2 flex flex-col shadow-sm">
      <div className="mx-auto">
        <Logo />
      </div>

      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
