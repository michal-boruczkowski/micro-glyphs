// Typ pomocniczy inferujący pojedynczy obiekt wynikowy
type CartesianProduct<T extends Record<string, readonly any[]>> = {
    -readonly [K in keyof T]: T[K][number];
};

export function getCartesianProduct<T extends Record<string, readonly any[]>>(
    obj: T
): CartesianProduct<T>[] {
    const keys = Object.keys(obj) as Array<keyof T>;

    // Zabezpieczenie przed pustym obiektem wejściowym
    if (keys.length === 0) return [];

    return keys.reduce<any[]>(
        (acc, key) => {
            const values = obj[key];
            // Dla każdej dotychczasowej kombinacji, tworzymy nowe poprzez dodanie wszystkich możliwych wartości dla obecnego klucza
            return acc.flatMap((item) =>
                values.map((val) => ({ ...item, [key]: val }))
            );
        },
        [{}] // Punkt startowy: tablica z jednym pustym obiektem
    );
}