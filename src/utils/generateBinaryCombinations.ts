export function generateBinaryCombinations(n: number) {
    if (n <= 0) return [];

    const totalCombinations = Math.pow(2, n);
    const results: Uint8Array[] = [];

    for (let i = 0; i < totalCombinations; i++) {
        const combination = new Uint8Array(n);

        for (let j = 0; j < n; j++) {
            combination[j] = (i >> (n - 1 - j)) & 1;
        }

        results.push(combination);
    }

    return results;
}