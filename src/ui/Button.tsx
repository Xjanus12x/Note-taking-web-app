import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="px-4 py-2.5 font-bold bg-transparent border btn text-color border-border-2 hover:bg-background-4/20 "
      {...props}
    >
      {children}
    </button>
  );
}
