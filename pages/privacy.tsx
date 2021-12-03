import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeftIcon } from "@modulz/radix-icons";

/**
 * Privacy policy page copy and formatting
 */
function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Privacy | Wrapped</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content="" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl mx-auto text-gray-200 p-6 sm:py-32 sm:px-10 space-y-2">
        <h1 className="text-5xl font-bold pt-5 pb-2">Privacy Policy</h1>
        <span className="text-gray-400">Last updated </span>
        <span className="font-medium">3 Dec 2021</span>
        <Link href="/">
          <a className="absolute group top-8 left-10 p-4 flex items-center text-gray-400 hover:text-gray-200 space-x-3 cursor-pointer">
            <ArrowLeftIcon className="scale-150 group-hover:-translate-x-2 transition-transform" />
            <span>Go back</span>
          </a>
        </Link>
        <p>
          This is written by a developer, not a lawyer. Please don't sue us.
        </p>
        <p className="text-3xl font-bold pt-5">Your data</p>
        <p>
          When you sign in with GitHub, we fetch some information about your
          account and repositories you've contributed to. That information stays
          on your machine until you click Share Link or Share on Twitter, at
          which point a popup reminds you that you'll be sharing your
          information.
        </p>
        <p>
          When generating a public URL, all info on the site is written to a
          Supabase table under your GitHub username. This allows other users to
          see your stats when they click your link.
        </p>
        <p>We won't sell your info or use it to market to you.</p>
        <h1 className="text-3xl font-bold pt-5">Changes to this policy</h1>
        <p>
          We may update this policy in the future. Please check back for
          changes.
        </p>
        <p>
          Changes become effective when published. By using our site, you agree
          to this policy.
        </p>
        <h1 className="text-3xl font-bold pt-5">Contact us 📞</h1>
        <p>
          If you have any questions, we can be reached at{" "}
          <a href={`mailto:info@getneat.io`}>info@getneat.io</a>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
