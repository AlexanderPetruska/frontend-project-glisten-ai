"use client";

import Link from "next/link";
import { useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import WordMark from "@/components/WordMark";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 py-2 font-medium text-white sm:flex-row md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <WordMark />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>

          <button
            type="button"
            className="block p-2 text-3xl text-white sm:hidden"
            ariae-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none sm:hidden",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-6 mb-4 block p-2 text-3xl text-white sm:hidden"
            ariae-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>
        </div>
        {/* Desktop Nav */}

        <ul className="flex gap-6">
          {settings.data.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink field={item.link}>{item.label}</ButtonLink>
                </li>
              );
            }
            return (
              <li key={item.label}>
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={item.link}
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
