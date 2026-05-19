import localFont from "next/font/local";

const sans = localFont({
  src: [
    {
      path: "../../public/fonts/InterDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const serif = localFont({
  src: [
    {
      path: "../../public/fonts/GT-Sectra-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const fontVariables = `${sans.variable} ${serif.variable}`;
