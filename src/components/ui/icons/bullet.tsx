import type { SVGProps } from "react";

export function BulletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="7"
      height="10"
      viewBox="0 0 7 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M0 0.0504435C0 0.0147924 0.0359743 -0.00961053 0.0690992 0.00357084L6.63487 2.61629C6.65407 2.62392 6.66667 2.6425 6.66667 2.66316V7.28899C6.66667 7.30965 6.65407 7.32822 6.63487 7.33586L0.0690989 9.94858C0.035974 9.96176 0 9.93736 0 9.9017V0.0504435Z"
        fill="currentColor"
      />
    </svg>
  );
}
