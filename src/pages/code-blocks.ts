import css from "@shikijs/langs/css";
import typescript from "@shikijs/langs/typescript";
import vitesseDark from "@shikijs/themes/vitesse-dark";
import vitesseLight from "@shikijs/themes/vitesse-light";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const shiki = createHighlighterCoreSync({
  themes: [vitesseLight, vitesseDark],
  langs: [typescript, css],
  engine: createJavaScriptRegexEngine(),
});

function transform(code: string, lang = "shell") {
  return {
    raw: code,
    html: shiki.codeToHtml(code, {
      lang,
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    }),
  };
}

export let jsSnippet = transform(
  `function themeCheck() {
  let prefersDarkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let preferred = prefersDarkModeQuery.matches ? "dark" : "light";
  document.documentElement.classList.add(preferred);
  prefersDarkModeQuery.addEventListener("change", (e) => {
    let newPreferred = e.matches ? "dark" : "light";
    document.documentElement.classList.remove(preferred);
    document.documentElement.classList.add(newPreferred);
    preferred = newPreferred;
  });
}
`,
  "typescript",
);

export let cssSnippet = transform(
  `html {
  min-height: 100vh;
  min-width: 100vw;

  background-color: var(--color-white);
  color: var(--color-black);
}

html.dark {
  background-color: var(--color-black);
  color: var(--color-white);
}
`,
  "css",
);
