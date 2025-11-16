import { MetaProvider, Title, Link, Meta, Stylesheet } from "@solidjs/meta";
import { Router, RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

// todo generate only used highlights to save a few bytes
// import "~/generated/highlight.css
import Header from "~/components/Header";
import Footer from "~/components/Footer";

function Root(props: RouteSectionProps) {
  return (
    <MetaProvider>
      <Title>David Parrott</Title>
      <Meta name="description" content="A tech blog(?)" />
      <Meta name="viewport" content="width=devide-width, inital-scale=1" />
      <Link rel="stylesheet" href="/css/app.css" />
      <Link rel="stylesheet" href="/css/highlight.css" />
      <Link rel="icon" href="favicon.png" type="image/png" />
      <main>
        <Header />
        <Suspense>{props.children}</Suspense>
        <Footer />
      </main>
    </MetaProvider>
  );
}

export default function App() {
  return (
    <Router root={Root}>
      <FileRoutes />
    </Router>
  );
}
