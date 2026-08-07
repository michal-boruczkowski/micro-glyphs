import { useEffect, useState } from "react";

export function useCounterStrategy<T>(
  collection: T[],
  pageLimit: number = Infinity,
  delay: number = 100,
) {
  const [count, setCount] = useState(1);

  const combinations =
    count > pageLimit ? collection.slice(count - pageLimit, count) : collection.slice(0, count);

  useEffect(() => {
    const timer = setInterval(() => {
      requestAnimationFrame(() => {
        setCount((prev) => {
          if (prev >= collection.length) {
            return 1;
          }
          return prev + 1;
        });
      });
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [collection.length, delay]);

  return [combinations, count, setCount] as const;
}
