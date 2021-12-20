import React from "react";

function ProductHuntBadge() {
  return (
    <a
      href="https://www.producthunt.com/posts/github-wrapped-4?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-github-wrapped-4"
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">Product Hunt badge</span>
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=322830&theme=dark"
        alt="GitHub Wrapped - Your year in code | Product Hunt"
        width="250"
        height="54"
      />
    </a>
  );
}

export default ProductHuntBadge;
