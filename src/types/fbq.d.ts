interface Window {
  fbq?: (
    command: "init" | "track" | "consent",
    ...args: unknown[]
  ) => void;
  _fbq?: Window["fbq"];
}
