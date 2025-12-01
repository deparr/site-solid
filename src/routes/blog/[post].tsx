import { Meta, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import blogPosts from "~/generated/rendered-blog-posts";
import "./blog-post.css";

export default function BlogPage() {
  const params = useParams();
  const page = createMemo(() => {
    if (!params.post) {
      throw new Error("bad post to [...ppost]");
    }
    return blogPosts.find((p) => p.id === params.post);
  });

  return (
    <article>
      <Title>{page()?.title}</Title>
      <Meta name="description" content={page()?.description ?? "A tech blog (?)"} />
      <div class="title-card">
        <h1 class="text-grad">{page()?.title}</h1>
        <time class="text-alt">{page()?.date}</time>
      </div>
      <hr />
      <div innerHTML={page()?.html} />
    </article>
  );
}

export function getStaticPaths() {
  return blogPosts.map((page) => ({
    params: { post: page.id }
  }));
}
