import { NavigationMenu } from "@base-ui/react/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavDropdownChild } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NavDropdownContentProps {
  items: NavDropdownChild[];
}

export function NavDropdownContent({ items }: NavDropdownContentProps) {
  const pathname = usePathname();

  return (
    <ul className="flex w-max min-w-[17.5rem] flex-col gap-1">
      {items.map((child) => {
        const isActive =
          !child.href.startsWith("/#") &&
          (pathname === child.href || pathname.startsWith(child.href + "/"));

        return (
          <li key={child._key}>
            <NavigationMenu.Link
              render={<Link href={child.href} />}
              active={isActive}
              className={cn(
                "flex w-full flex-col gap-1 rounded-xs px-4 py-3 text-decoration-none transition-[background-color,box-shadow] duration-200",
                "hover:bg-light-gray hover:shadow-subtle-hover",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                isActive && "bg-mid-gray shadow-subtle",
              )}
            >
              <span className="type-paragraph-m-bold text-text">
                {child.label}
              </span>
              {child.description && (
                <span className="type-paragraph-s text-light-brown">
                  {child.description}
                </span>
              )}
            </NavigationMenu.Link>
          </li>
        );
      })}
    </ul>
  );
}
