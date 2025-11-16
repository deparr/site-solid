import { createEffect, createSignal, createUniqueId, onMount } from "solid-js";
import { useHead } from "@solidjs/meta";

import "./ThemeToggle.css";
import readThemeLocal from "./read-theme-local.js?raw";

export default function ThemeToggle() {

  const [theme, setTheme] = createSignal<"light" | "dark">("light");
  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme == "light") {
      setTheme(savedTheme);
    }
  });

  createEffect(() => {
    const currentTheme = theme();
    const doc = document.documentElement;
    if (currentTheme == "dark") {
      doc.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      doc.setAttribute("data-theme", "light");
      localStorage.removeItem("theme");
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  };

  useHead({
    tag: "script",
    id: createUniqueId(),
    props: { children: readThemeLocal },
    setting: { close: true },
  });

  return (
    <button onclick={toggleTheme}>{theme() === "dark" ? "light" : "dark"}</button>
  );
}
