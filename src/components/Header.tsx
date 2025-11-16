import { A } from "@solidjs/router";
import ThemeToggle from "~/components/ThemeToggle";

export default function Header() {
  return (
    <header>
      <nav>
        <A href="/">home</A>
        <A href="/blog">posts</A>
        <ThemeToggle />
      </nav>
    </header>
  );
}
