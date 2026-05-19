import type { SVGProps } from "react";

export function CheckmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M0.699951 5.16016L4.19995 8.66016L11.2 1.66016"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
