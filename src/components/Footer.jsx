import React from "react";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const Footer = () => {
  const links = [
    {
      id: 1,
      href: "/about",
      label: "About",
    },
    {
      id: 2,
      href: "https://github.com/RaiYashPramod/PowrLingo-client",
      label: "Contribute on Github",
    },
  ];

  return (
    <footer className="p-12 sm:mb-0 bg-black text-neutral-500 ">
      <div className="border-b border-b-dim-gray lg:-mt-10 pb-6 lg:p-0">
        <span className="font-mono-bold2 opacity-70 lg:p-28 text-4xl lg:text-[15rem] mt-0 flex justify-center items-center">
          POWRLINGO
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-6 pb-10 text-text">
        <div className="flex flex-col items-start gap-y-1 xl:flex-row xl:items-center xl:gap-x-1 xl:w-96">
          <span className="w-fit flex-nowrap whitespace-nowrap font-mono-regular">Made by {" "}</span>
          <a
            className="font-mono-bold relative overflow-y-hidden w-full group h-fit"
            target="_blank"
            href="https://www.linkedin.com/in/raiyashpramodanita"
          >
            <span className="flex group-hover:-translate-y-5 group-hover:opacity-0 transition-all ease-in-out-circ duration-500">
              Rai Yash Pramod Anita
            </span>
            <span className="absolute inset-0 group-hover:translate-y-0 translate-y-5 xl:translate-y-8 transition-all ease-in-out-circ duration-500 no-underline overflow-hidden flex-nowrap whitespace-nowrap">
              RaiYashPramodAnita :)
            </span>
          </a>
        </div>

        <ul className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 grid gap-x-1 gap-y-3 pt-8 md:pt-0 font-mono-regular">
          {links.map((link) => (
            <li
              key={link.id}
              className="flex w-fit group text-base xl:text-h7 2xl:text-h6"
            >
              {link.id === 2 || link.id === 4 ? (
                <a
                  className="group"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <a className="group" href={link.href}>
                  {link.label}
                </a>
              )}
              <span className="relative overflow-hidden h-fit w-fit">
                <GoArrowUpRight className="group-hover:-translate-y-5 group-hover:translate-x-5 duration-500 transition-transform ease-in-out-circ fill-light-gray stroke-[0.2]" />
                <GoArrowUpRight className="absolute top-0 group-hover:translate-x-0 duration-500 group-hover:translate-y-0 transition-all ease-in-out-circ translate-y-5 -translate-x-5 fill-light-gray stroke-[0.2]" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
