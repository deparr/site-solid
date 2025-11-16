import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { Router, RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

function Root(props: RouteSectionProps) {
  return (
    <MetaProvider>
      <Title>deparr</Title>
      <Link rel="stylesheet" href="/css/app.css" />
      <Link rel="stylesheet" href="/css/highlight.css" />
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
