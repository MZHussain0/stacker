import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return <Image height={130} width={130} alt="logo" src={"/logo-w.png"} />;
};

export default Logo;
