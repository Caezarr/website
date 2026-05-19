"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLink } from "./desktop-nav-link";
import { NavDropdownContent } from "./desktop-nav-dropdown";
import type { NavItem } from "@/lib/types";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-3 w-3", className)}
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function isDropdownActive(item: NavItem, pathname: string) {
  if (item.itemType !== "dropdown") return false;
  if (
    item.href &&
    (pathname === item.href || pathname.startsWith(item.href + "/"))
  )
    return true;
  return false;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

export function DesktopNav({ navItems }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root delay={25} closeDelay={100}>
      <NavigationMenu.List className="flex items-center">
        {navItems.map((item) => (
          <NavigationMenu.Item key={item._key}>
            {item.itemType === "link" ? (
              <NavLink href={item.href || "/"}>{item.label}</NavLink>
            ) : (
              <NavigationMenu.Trigger
                {...(item.href
                  ? { render: <Link href={item.href} />, nativeButton: false }
                  : {})}
                className={cn(
                  "type-paragraph-m-bold inline-flex h-[1.875rem] items-center gap-1 px-4 py-2.5 text-text transition-colors",
                  "hover:text-text/70",
                  "data-popup-open:text-text/70",
                  isDropdownActive(item, pathname) && "text-text/70",
                )}
              >
                {item.label}
                <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
                  <ChevronDown />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>
            )}

            {item.itemType === "dropdown" && item.children && (
              <NavigationMenu.Content className="nav-content">
                <NavDropdownContent items={item.children} />
              </NavigationMenu.Content>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          align="start"
          sideOffset={8}
          collisionPadding={20}
          className="nav-positioner z-100"
        >
          <NavigationMenu.Popup className="nav-popup rounded-xl border border-border bg-background shadow-lg">
            <NavigationMenu.Viewport className="nav-viewport" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
