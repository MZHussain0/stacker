import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-full bg-primary text-secondary flex items-center justify-center flex-col">
      <h2 className=" text-2xl font-bold">Welcome to Stacker</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
