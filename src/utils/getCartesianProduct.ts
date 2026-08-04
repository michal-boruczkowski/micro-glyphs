// Helper type inferring a single resulting object
type CartesianProduct<T extends Record<string, readonly any[]>> = {
    -readonly [K in keyof T]: T[K][number];
};

export function getCartesianProduct<T extends Record<string, readonly any[]>>(
    obj: T
): CartesianProduct<T>[] {
    const keys = Object.keys(obj) as Array<keyof T>;

    // Guard against an empty input object
    if (keys.length === 0) return [];

    // Early exit: if any array is empty, the Cartesian product will also be empty
    for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]].length === 0) return [];
    }

    const result: CartesianProduct<T>[] = [];
    const currentCombination = {} as CartesianProduct<T>;

    // Depth-First Search (DFS) recursive function to build combinations
    // This entirely eliminates intermediate object allocations and array mapping
    function generateCombinations(keyIndex: number): void {
        // Base case: we've processed all keys, combination is complete
        if (keyIndex === keys.length) {
            result.push(Object.assign({}, currentCombination));
            return;
        }

        const key = keys[keyIndex];
        const values = obj[key];

        // A standard for-loop is highly optimized by JavaScript engines
        for (let i = 0; i < values.length; i++) {
            // Mutate the shared object instead of creating new ones
            currentCombination[key] = values[i];

            // Move to the next key
            generateCombinations(keyIndex + 1);
        }
    }

    // Start building combinations from the first key
    generateCombinations(0);

    return result;
}