import React from "react";

interface Props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavButton({ title, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-stone-700"
      } hover:bg-stone-700 text-white py-2 px-4 rounded font-bold`}
    >
      {title}
    </button>
  );
}

export default NavButton;
