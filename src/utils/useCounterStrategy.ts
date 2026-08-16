import { useEffect, useState } from "react";

export type CounterStrategyOptions = {
  start?: number;
  stop?: number;
  page?: number;
  duration?: number;
};

export function useCounterStrategy<T>(collection: T[], options: CounterStrategyOptions = {}) {
  const { start = 1, stop, page = Infinity, duration = 100 } = options;
  const [count, setCount] = useState(start);

  const combinations =
    count > page ? collection.slice(count - page, count) : collection.slice(0, count);

  useEffect(() => {
    const timer = setInterval(() => {
      requestAnimationFrame(() => {
        setCount((prev) => {
          if (stop !== undefined && prev >= stop) {
            clearInterval(timer);
            return prev;
          }
          if (prev >= collection.length) {
            return start;
          }
          return prev + 1;
        });
      });
    }, duration);

    return () => {
      clearInterval(timer);
    };
  }, [collection.length, duration, start, stop]);

  return [combinations, count, setCount] as const;
}
