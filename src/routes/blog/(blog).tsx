import { A } from "@solidjs/router";
import { For } from "solid-js";
import blogPosts from "~/generated/rendered-blog-posts";

export default function BlogIndex() {
  return (
    <ul class="post-list">
      <For each={blogPosts} >
        {(post) => (post.id.toLowerCase() !== "hl-test" &&
          <li>
            <time class="text-alt">{post.date}</time>
            <h2 id={post.id}>
              <A class="text-grad" href={`/blog/${post.id}`}>{post.title}</A>
            </h2>
          </li>
        )}
      </For>
    </ul>
  );
}
