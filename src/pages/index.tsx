import { cssSnippet, jsSnippet } from "../code-blocks" with { type: "macro" };
import { CopyButton } from "../components/copy-button";

function CodeBlock(props: { children: { raw: string; html: string } }) {
  return (
    <div className="relative not-prose font-mono">
      <CopyButton
        value={props.children.raw}
        className="absolute right-2 top-2 h-8 w-8 hover:bg-muted/30"
      />
      <code
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: props.children.html }}
        className="[&>pre]:p-4 [&>pre]:rounded-md [&>pre]:overflow-auto my-2 [&>pre]:font-mono [&>pre]:pr-12 block"
      />
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="prose lg:prose-xl dark:prose-invert mx-auto font-sans my-40">
      <h1>SSR-compatible theming with Waku</h1>
      <p>
        This app demonstrates a way to support SSR-safe theming within a Waku
        app. It relies on injecting a script that will be hoisted into the{" "}
        <code>head</code> by React, which will then immediately run a function
        to check the preferred user theme, and set a theme classname on the{" "}
        <code>html</code> element.
      </p>
      <p>
        Proof that this page is server side rendered:{" "}
        <time className="italic" suppressHydrationWarning>
          {new Date().toLocaleString()}
        </time>{" "}
        (refresh to see the time from the server!)
      </p>
      <p>
        <strong>SSR-safe theming</strong> means that the theme is applied to the
        page before the user sees any content. This avoids any flash of unstyled
        content or flash of incorrectly styled content based on the users
        desired color scheme.
      </p>
      <h2>How it works:</h2>
      <p>Here's the script that gets injected into the head:</p>
      <CodeBlock>{jsSnippet}</CodeBlock>
      <p>
        Then, you can customize your css to style the document based on the two
        theme classes (<code>light</code> and <code>dark</code>).
      </p>
      <CodeBlock>{cssSnippet}</CodeBlock>
      <p>That's it!</p>
    </main>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
