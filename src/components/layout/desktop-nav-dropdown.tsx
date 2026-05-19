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
    <ul className="flex w-max min-w-[220px] flex-col gap-0.5 p-1.5">
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
                "flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-decoration-none transition-colors hover:bg-light-gray",
                isActive && "bg-light-gray",
              )}
            >
              <span className="text-sm font-bold text-text">
                {child.label}
              </span>
              {child.description && (
                <span className="text-xs font-medium text-text/60">
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
