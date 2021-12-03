import Head from "next/head";
import React from "react";

/**
 * Homepage head tags
 * @param user the current user
 * @returns title, meta tags, styles, favicon, etc
 */
function HeadTags({ user }) {
  return (
    <Head>
      {/* Eg. natfriedman's GitHub Wrapped */}
      <title>GitHub Wrapped</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="theme-color" content="#000" />
      <meta
        name="description"
        content="Dive into analytics of your year as a developer. Total commits, top repositories, and favourite languages."
      />

      {/* Dynamically generated link preview */}
      <meta
        property="og:title"
        content={`${
          user && user.username ? `${user.username}'s ` : ""
        }GitHub Wrapped`}
      />
      <meta property="og:url" content="https://wrapped.run" />
      <meta property="og:site_name" content="Wrapped.run" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={
          user && user.linkPreviewURL
            ? user.linkPreviewURL
            : "https://user-images.githubusercontent.com/36117635/144351202-c8c64e44-5be8-43c3-8cec-b86ada4dd423.png"
        }
      />
      <meta
        property="og:description"
        content={
          user && user.username
            ? `${user.username} coded a lot in 2021. See your own stats: total pull requests, top repos, and favourite languages.`
            : "Dive into analytics of your year as a developer. Total commits, top repositories, and favourite languages."
        }
      />

      {/* Twitter-specific meta tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@neat_run" />
      <meta property="twitter:title" content="GitHub Wrapped 2021" />
      <meta
        property="twitter:image"
        content={
          user && user.linkPreviewURL
            ? user.linkPreviewURL
            : "https://user-images.githubusercontent.com/36117635/144351202-c8c64e44-5be8-43c3-8cec-b86ada4dd423.png"
        }
      />

      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
        crossOrigin="anonymous"
      />
    </Head>
  );
}

export default HeadTags;
