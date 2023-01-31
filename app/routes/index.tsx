import { type DataFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: DataFunctionArgs) => {
  const url = new URL(request.url);
  const domain = url.host;
  // regex from https://stackoverflow.com/a/10526727
  // /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i
  const subdomain =
    domain.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i)?.[1] ??
    "none found";

  return json({ subdomain });
};

export default function Index() {
  const { subdomain } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome to sbdmn-me</h1>
      <p>
        This is just to show how and if we can grab the current subdomain on
        fly.io using remix.
      </p>
      <pre>
        <code>Subdomain: {subdomain}</code>
      </pre>
    </div>
  );
}
