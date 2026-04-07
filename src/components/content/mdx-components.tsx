import type { MDXComponents } from "mdx/types";
import { Callout } from "./callout";

export const mdxCustomComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl font-bold tracking-tight text-foreground mb-6"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 border-b border-border pb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-lg font-semibold text-foreground mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-foreground/85 leading-7 mb-4" {...props} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-muted/50" {...props} />,
  th: (props) => (
    <th
      className="px-4 py-2.5 text-left font-semibold text-foreground/90 border-b border-border"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-4 py-2.5 text-foreground/80 border-b border-border/50"
      {...props}
    />
  ),
  tr: (props) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props} />
  ),
  a: (props) => (
    <a
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  li: (props) => <li className="text-foreground/85 leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-4"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground/90"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  Callout,
};
