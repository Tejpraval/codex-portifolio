import { useEffect, useState } from "react";

export function useTypewriter(words, typingSpeed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const completedWord = !deleting && text === currentWord;
    const clearedWord = deleting && text === "";
    const delay = completedWord ? pause : deleting ? typingSpeed / 2 : typingSpeed;

    const timeout = setTimeout(() => {
      if (completedWord) {
        setDeleting(true);
        return;
      }

      if (clearedWord) {
        setDeleting(false);
        setWordIndex((value) => value + 1);
        return;
      }

      const nextText = deleting
        ? currentWord.slice(0, text.length - 1)
        : currentWord.slice(0, text.length + 1);

      setText(nextText);
    }, delay);

    return () => clearTimeout(timeout);
  }, [deleting, pause, text, typingSpeed, wordIndex, words]);

  return text;
}
