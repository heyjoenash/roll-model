import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { contentMap } from "@/lib/content-map";
import { mdxCustomComponents } from "@/components/content/mdx-components";
import { SceneSetter } from "./scene-setter";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function LearnContentPage({ params }: Props) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const entry = contentMap[slugPath];

  if (!entry) {
    notFound();
  }

  let source: string;
  try {
    const filePath = join(process.cwd(), "content", `${slugPath}.mdx`);
    source = await readFile(filePath, "utf-8");
  } catch {
    notFound();
  }

  return (
    <>
      <SceneSetter scene={entry.scene} />
      <article>
        <MDXRemote
          source={source}
          components={mdxCustomComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(contentMap).map((path) => ({
    slug: path.split("/"),
  }));
}
