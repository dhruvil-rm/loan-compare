import { useEffect } from "react";
import { siteConfig } from "../config/site.js";

// The project has no head-management library (pages set document.title
// directly), so this small hook covers <title> + meta description per route
// without adding a dependency.
export default function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    const prevDesc = tag.getAttribute("content");
    if (description) tag.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null) tag.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}