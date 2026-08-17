import { useEffect, useState } from "react";
import { getScenarioLimit } from "../components/consts";

export type CounterStrategyOptions = {
  startIndex?: number;
  stopIndex?: number;
  page?: number;
  pageMul?: number;
  duration?: number;
  loop?: boolean;
  stop?: boolean;
};

export function useCounterStrategy<T>(collection: T[], options: CounterStrategyOptions = {}) {
  const { startIndex = 1, pageMul, duration = 100, loop = false, stop = false } = options;
  const [count, setCount] = useState(startIndex);

  const page = pageMul !== undefined ? getScenarioLimit(pageMul) : (options.page ?? Infinity);

  const stopIndex = stop ? collection.length : options.stopIndex;

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
          if (stopIndex !== undefined && prev >= stopIndex) {
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
            return startIndex;
          }
          return prev + 1;
        });
      });
    }, duration);

    return () => {
      clearInterval(timer);
    };
  }, [collection.length, duration, loop, page, startIndex, stopIndex]);

  return [combinations, count, setCount] as const;
}
