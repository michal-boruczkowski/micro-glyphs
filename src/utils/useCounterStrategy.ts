import { useEffect, useState } from "react";

export function useCounterStrategy<T>(
  collection: T[],
  start: number = 1,
  pageLimit: number = Infinity,
  delay: number = 100,
) {
  const [count, setCount] = useState(start);

  const combinations =
    count > pageLimit ? collection.slice(count - pageLimit, count) : collection.slice(0, count);

  useEffect(() => {
    const timer = setInterval(() => {
      requestAnimationFrame(() => {
        setCount((prev) => {
          if (prev >= collection.length) {
            return start;
          }
          return prev + 1;
        });
      });
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [collection.length, delay, start]);

  return [combinations, count, setCount] as const;
}
