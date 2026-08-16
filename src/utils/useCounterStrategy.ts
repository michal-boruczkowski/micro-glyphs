import { useEffect, useState } from "react";
import { getScenarioLimit } from "../components/consts";

export type CounterStrategyOptions = {
  start?: number;
  stop?: number;
  page?: number;
  pageMul?: number;
  duration?: number;
  loop?: boolean;
};

export function useCounterStrategy<T>(collection: T[], options: CounterStrategyOptions = {}) {
  const {
    start = 1,
    stop,
    pageMul,
    page = pageMul !== undefined ? getScenarioLimit(pageMul) : Infinity,
    duration = 100,
    loop = false,
  } = options;
  const [count, setCount] = useState(start);

  const combinations = (() => {
    if (count <= page || page >= collection.length) {
      return collection.slice(0, count);
    }
    if (!loop || count <= collection.length) {
      return collection.slice(count - page, count);
    }
    return [
      ...collection.slice(count - page, collection.length),
      ...collection.slice(0, count - collection.length),
    ];
  })();

  useEffect(() => {
    const timer = setInterval(() => {
      requestAnimationFrame(() => {
        setCount((prev) => {
          if (stop !== undefined && prev >= stop) {
            clearInterval(timer);
            return prev;
          }
          if (loop && page < collection.length) {
            if (prev >= collection.length + page - 1) {
              return page;
            }
            return prev + 1;
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
  }, [collection.length, duration, loop, page, start, stop]);

  return [combinations, count, setCount] as const;
}
