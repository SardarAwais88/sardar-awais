'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './TypeWriter.module.css';

interface TypeWriterProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export default function TypeWriter({
  words,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypeWriterProps) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    timerRef.current = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, pauseTime]);

  return (
    <span className={styles.typewriter}>
      {text}
      <span className={styles.cursor}>|</span>
    </span>
  );
}
