import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import Library from "./Library";
import { getLesson, DEFAULT_SLUG } from "./lessons";

/**
 * App — tiny hash router.
 *   (no hash)          → the default lesson, exactly as always (bookmark-safe)
 *   #/library          → instructor lesson catalog (reached via presenter HUD)
 *   #/lesson/<slug>    → any lesson in the registry
 */
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();

  if (hash.startsWith("#/library")) return <Library />;

  const match = hash.match(/^#\/lesson\/([\w-]+)/);
  const slug = match ? match[1] : DEFAULT_SLUG;
  const lesson = getLesson(slug) || getLesson(DEFAULT_SLUG);

  // key resets the deck to screen 1 when switching lessons
  return <Deck key={lesson.slug} {...lesson.getDeck()} />;
}
