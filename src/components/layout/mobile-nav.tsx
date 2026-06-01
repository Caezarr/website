"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem, CtaButtonData } from "@/lib/types";

function MobileNavAccordion({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex w-full items-center justify-between py-2">
        {item.href ? (
          <Link
            href={item.href}
            onClick={onNavigate}
            className="type-paragraph-m text-black transition-colors"
          >
            {item.label}
          </Link>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="type-paragraph-m text-black transition-colors"
          >
            {item.label}
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="-mr-2 p-2"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
        >
          <svg
            className={cn(
              "size-5 shrink-0 text-black transition-transform duration-200",
              isOpen && "rotate-180",
            )}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 pb-1 pl-4 pt-2">
            {item.children?.map((child) => (
              <Link
                key={child._key}
                href={child.href}
                onClick={onNavigate}
                className="type-paragraph-s py-1.5 text-light-brown transition-colors hover:text-black"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileNavToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-white text-black shadow-subtle transition-all active:scale-[0.97]"
      aria-label="Toggle menu"
    >
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        )}
      </svg>
    </button>
  );
}

export function MobileNavOverlay({
  isOpen,
  onClose,
  navItems,
  headerCta,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  headerCta?: CtaButtonData | null;
}) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[3.5rem] bottom-0 z-30 bg-white transition-opacity duration-200 lg:hidden",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <nav className="flex flex-col gap-2 px-6 pt-4">
        {navItems.map((item) =>
          item.itemType === "link" ? (
            <Link
              key={item._key}
              href={item.href || "/"}
              onClick={onClose}
              className="type-paragraph-m py-2 text-black transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <MobileNavAccordion
              key={`${item._key}-${isOpen ? "o" : "c"}`}
              item={item}
              onNavigate={onClose}
            />
          ),
        )}

        <div className="h-px w-full bg-black/10" />

        {headerCta && (
          <div className="flex">
            <ButtonLink href="https://www.cal.eu/team/wonka-ai-experts/demonstration-call" variant="primary" className="w-full">
              {headerCta.label}
            </ButtonLink>
          </div>
        )}
      </nav>
    </div>
  );
}
