import type { MDXComponents } from "mdx/types";
import { mdxCustomComponents } from "@/components/content/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxCustomComponents,
    ...components,
  };
}
