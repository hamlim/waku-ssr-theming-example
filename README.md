# SSR-compatible theming with Waku

> See the [live demo here]()

This app demonstrates a way to support SSR-safe theming within a Waku app. It relies on injecting a script that will be hoisted into the head by React, which will then immediately run a function to check the preferred user theme, and set a theme classname on the `html` element.

**SSR-safe theming** means that the theme is applied to the page before the user sees any content. This avoids any flash of unstyled content or flash of incorrectly styled content based on the users desired color scheme.

## How it works:

Here's the script that gets injected into the head:

```js
function themeCheck() {
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
```

Then, you can customize your css to style the document based on the two theme classes (`light` and `dark`).

```css
html {
  min-height: 100vh;
  min-width: 100vw;

  background-color: var(--color-white);
  color: var(--color-black);
}

html.dark {
  background-color: var(--color-black);
  color: var(--color-white);
}
```


That's it!