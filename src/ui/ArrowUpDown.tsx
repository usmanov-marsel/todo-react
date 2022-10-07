import React from "react";

interface Props {
  isOpen: boolean;
}

const ArrowUpDown = ({ isOpen }: Props) => {
  if (isOpen) {
    return (
      <svg
        className="chevron-right h-5 w-5 group-hover:fill-slate-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    );
  } else {
    return (
      <svg
        className="chevron-right h-5 w-5 group-hover:fill-slate-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    );
  }
};

export default ArrowUpDown;
