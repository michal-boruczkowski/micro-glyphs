import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounterStrategy } from "../utils/useCounterStrategy";

describe("useCounterStrategy", () => {
  const collection = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  it("calculates window combinations without loop", () => {
    const results: Record<string, string[]> = {};
    const { result } = renderHook(() =>
      useCounterStrategy(collection, { page: 4, startIndex: 1, duration: 1000 }),
    );

    results["count 1 (start)"] = result.current[0];

    act(() => {
      result.current[2](4);
    });
    results["count 4 (full page)"] = result.current[0];

    act(() => {
      result.current[2](7);
    });
    results["count 7 (sliding)"] = result.current[0];

    act(() => {
      result.current[2](10);
    });
    results["count 10 (end of collection)"] = result.current[0];

    expect(results).toMatchSnapshot();
  });

  it("calculates window combinations with loop wrapping around the end", () => {
    const results: Record<string, string[]> = {};
    const { result } = renderHook(() =>
      useCounterStrategy(collection, { page: 4, startIndex: 1, loop: true, duration: 1000 }),
    );

    act(() => {
      result.current[2](10);
    });
    results["count 10 (at end)"] = result.current[0];

    act(() => {
      result.current[2](11);
    });
    results["count 11 (1 element from start)"] = result.current[0];

    act(() => {
      result.current[2](12);
    });
    results["count 12 (2 elements from start)"] = result.current[0];

    act(() => {
      result.current[2](13);
    });
    results["count 13 (3 elements from start)"] = result.current[0];

    expect(results).toMatchSnapshot();
  });
});
