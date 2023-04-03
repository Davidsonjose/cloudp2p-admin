import React from "react";

interface ContainerStylesTypes {
  children: JSX.Element;
  className?: string;
  fullscreen?: boolean;
}
function Container(props: ContainerStylesTypes) {
  return (
    <div
      className={`bg-white ${
        props.fullscreen === true && "flex-1 h-screen"
      } shadow-header rounded-lg dark:bg-[#333333]  dark:text-white ${
        props.className
      } `}
    >
      {props.children}
    </div>
  );
}

export default Container;
