import { GitHubLogoIcon } from "@modulz/radix-icons";
import Link from "next/link";
import React from "react";
import Constants from "../utils/constants";

function Footer() {
  return (
    <footer className="px-0 md:px-8 w-1/5 md:w-full flex flex-wrap justify-center md:justify-between">
      <div className="flex items-center order-first md:order-2">
        <div className="m-3 flex whitespace-nowrap text-gray-400 text-center justify-center">
          Made by&nbsp;
          <a
            className="font-semibold text-indigo-500 hover:text-indigo-400 transition hover:-translate-y-1 duration-500"
            href={Constants.NEAT.URL}
          >
            Neat
          </a>
        </div>
      </div>
      <div className="flex order-1">
        <a
          href="https://github.com/neat-run/wrapped"
          target="_blank"
          className="text-gray-400 hover:text-gray-200 m-3 transition-transform hover:-translate-y-1 hover:rotate-3 duration-500 scale-[1.8]"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Source code on GitHub</span>
          <GitHubLogoIcon />
        </a>
      </div>

      <div className="flex order-3">
        <Link href="/privacy">
          <a className="text-gray-400 hover:text-gray-200 m-3 transition-transform hover:-translate-y-1 hover:-rotate-3 duration-500">
            Privacy
          </a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
