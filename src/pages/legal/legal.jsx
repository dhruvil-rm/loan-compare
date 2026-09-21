import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { legalPages } from "../../data/pages.js";
import "./legal.css";

// Tiny inline parser: **bold**, [label](url), and "\n" line breaks.
export function renderInline(text) {
  return text.split("\n").flatMap((line, li, lines) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
    const nodes = parts.map((part, i) => {
      const bold = part.match(/^\*\*([^*]+)\*\*$/);
      if (bold) return <strong key={`${li}-${i}`}>{bold[1]}</strong>;

      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        if (href.startsWith("/")) {
          return (
            <Link key={`${li}-${i}`} to={href}>
              {label}
            </Link>
          );
        }
        const external = href.startsWith("http");
        return (
          <a
            key={`${li}-${i}`}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        );
      }
      return part;
    });
    return li < lines.length - 1 ? [...nodes, <br key={`br-${li}`} />] : nodes;
  });
}

export function LastUpdated() {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return <p className="legal__updated">Last updated: {date}</p>;
}

export function LegalFooterLine() {
  return (
    <p className="legal__company">
      &copy; {new Date().getFullYear()} 4ADS MEDIA LLC (L21000233395) &mdash; 5401 S Kirkman RD,
      Suite 135 - Orlando, FL 32819
    </p>
  );
}

function LegalPage({ slug }) {
  const page = legalPages[slug];

  useEffect(() => {
    if (page) document.title = `${page.title} — Jyncow`;
  }, [page]);

  if (!page) return <Navigate to="/" replace />;

  return (
    <article className="legal">
      <div className="container legal__container">
        <h1 className="legal__title">{page.title}</h1>
        <LastUpdated />

        {page.intro && <p>{renderInline(page.intro)}</p>}

        {page.blocks.map((block, i) => {
          if (block.t === "h2") return <h2 key={i}>{block.x}</h2>;
          if (block.t === "h3") return <h3 key={i}>{block.x}</h3>;
          if (block.t === "ul")
            return (
              <ul key={i} className="legal__list">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          if (block.t === "ol")
            return (
              <ol key={i} className="legal__list legal__list--ordered">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          return <p key={i}>{renderInline(block.x)}</p>;
        })}

        <hr className="legal__rule" />
        <LegalFooterLine />
      </div>
    </article>
  );
}

export default LegalPage;
