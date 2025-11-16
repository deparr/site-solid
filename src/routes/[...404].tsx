import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <>
      <Title>Not Found</Title>
      <Meta name="description" content="Not all who wander are lost" />
      <HttpStatusCode code={404} />
      <section>
        <h1 class="text-grad">Page Not Found</h1>
        <hr />
        <p><A href="/">Go back home</A></p>
      </section>
    </>
  );
}
