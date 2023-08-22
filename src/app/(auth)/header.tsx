"use client";
import React, { useState } from "react";
import { LogoSvg } from "@/assets/icons/logo";
import Link from "next/link";
import { USFlagSvg } from "@/assets/icons/flag/flag.d";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MenuSideBarIcon } from "@/assets/icons";
import { ILinks } from "@/types";
import { LanguageOptionArr, LinksArr, SocialLinksArr } from "@/lib/util";

export default function Header() {
  const [activeLanguage, setActiveLanguage] = useState<boolean>(false);
  const [showLinks, setShowLinks] = useState<boolean>(false);

  return (
    <>
      <div className="md:flex hidden flex-row items-center justify-between gap-6 lg:gap-12">
        <div className="flex flex-row justify-between items-center gap-6 lg:gap-12">
          {LinksArr.map((link: ILinks) => (
            <Link
              key={link.id}
              href={link.linkUrl}
              className="text-blue text-lg font-semibold"
            >
              {link.linkName}
            </Link>
          ))}
        </div>
        <div className="relative">
          <button
            onClick={() => setActiveLanguage((prev) => !prev)}
            className="flex flex-row gap-2 items-center"
          >
            <USFlagSvg />
            <ChevronDownIcon className="h-4 w-4 text-gray-dark" />
          </button>
          {activeLanguage && (
            <div className="absolute ">
              <ul className="box-shadow border-white py-2 flex-col flex bg-white">
                {LanguageOptionArr ? (
                  LanguageOptionArr.map((language) => (
                    <li
                      key={language.id}
                      className="hover:bg-gray-light py-4 rounded-md px-4"
                    >
                      {language.image}{" "}
                    </li>
                  ))
                ) : (
                  <li>No Specified language</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* <header
        className={`relative flex z-10 md:hidden ${showLinks
          ? "min-h6 relative bg-blue-primary flex flex-col gap-4 items-center"
          : "max-h-16 "
          } bg-white px-10 justify-between flex-row items-center py-4 box-shadow`}
      >
        <div>
          <button onClick={() => setShowLinks((prev) => !prev)}>
            {showLinks ? (
              <span className="absolute text-7xl top-0 left-4">&times;</span>
            ) : (
              <span>
                <MenuSideBarIcon />
              </span>
            )}
          </button>
        </div>
        <div className="md:w-[10vw]">
          <LogoSvg />
        </div>
        <div className={`${showLinks ? "hidden" : "block relative"}`}>
          <button
            onClick={() => setActiveLanguage((prev) => !prev)}
            className="flex flex-row gap-2 items-center"
          >
            <USFlagSvg />
            <ChevronDownIcon className="h-4 w-4 text-gray-dark" />
          </button>
          {activeLanguage && (
            <div className="absolute ">
              <ul className="box-shadow border-white py-2 flex-col flex bg-white">
                <li className="hover:bg-gray-light py-4 rounded-md px-4">
                  <USFlagSvg />{" "}
                </li>
                <li className="hover:bg-gray-light py-4 rounded-md px-4">
                  <USFlagSvg />{" "}
                </li>
                <li className="hover:bg-gray-light py-4 rounded-md px-4">
                  <USFlagSvg />{" "}
                </li>
              </ul>
            </div>
          )}
        </div>
        {showLinks && (
          <div className="flex flex-col justify-between items-center gap-10 lg:gap-12">
            {LinksArr.map((link: ILinks) => (
              <Link
                key={link.id}
                href={link.linkUrl}
                className="text-blue font-semibold"
              >
                {link.linkName}
              </Link>
            ))}
          </div>
        )}
      </header> */}
    </>
  );
}
