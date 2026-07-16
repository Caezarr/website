"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./desktop-nav";
import { MobileNavToggle, MobileNavOverlay } from "./mobile-nav";
import type { NavItem, CtaButtonData } from "@/lib/types";

export type HeaderVariant = "overlay-dark" | "inline-light";

interface HeaderProps {
  navItems: NavItem[];
  headerCta?: CtaButtonData | null;
  variant?: HeaderVariant;
}

export function Header({
  navItems,
  headerCta,
  variant = "overlay-dark",
}: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  const isOverlayDark = variant === "overlay-dark";

  return (
    <>
      <Section
        as="header"
        {...(isOverlayDark ? { "data-theme": "dark" } : {})}
        fluid
        className={cn(
          "z-20 border-b border-dashed border-border !px-5 py-3 text-text",
          isOverlayDark
            ? "absolute inset-x-0 top-0 bg-text/[0.04]"
            : "relative bg-background",
        )}
        containerClassName="flex items-center justify-between gap-6"
      >
        <div className="flex flex-1 min-w-0 items-center">
          <Link
            href="/"
            aria-label="Wonka"
            className="inline-flex items-center text-text"
          >
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center lg:flex">
          <DesktopNav navItems={navItems} />
        </nav>

        <div className="hidden flex-1 items-center justify-end lg:flex">
          {headerCta && (
            <ButtonLink href={headerCta.href} variant="secondary">
              {headerCta.label}
            </ButtonLink>
          )}
        </div>

        <div className="flex items-center lg:hidden">
          <MobileNavToggle
            isOpen={mobileNavOpen}
            onToggle={() => setMobileNavOpen((o) => !o)}
          />
        </div>
      </Section>

      <MobileNavOverlay
        isOpen={mobileNavOpen}
        onClose={closeMobileNav}
        navItems={navItems}
        headerCta={headerCta}
      />
    </>
  );
}
