import { NavigationMenu } from "@base-ui/react/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    !href.startsWith("/#") &&
    (pathname === href || pathname.startsWith(href + "/"));

  return (
    <NavigationMenu.Link
      active={isActive}
      render={<Link href={href} />}
      className="type-paragraph-m-bold inline-flex h-[1.875rem] items-center justify-center px-4 py-2.5 text-text transition-colors hover:text-text/70 aria-[current=page]:text-text/70"
    >
      {children}
    </NavigationMenu.Link>
  );
}
