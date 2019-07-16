
export function add(a, b) {
    return a + b;
}

export const PI = 3.1415;

// window["add"] = add;
export function isEven(n: number): boolean {
    return n % 2 === 0;
}

export function formatName(firstName: string, lastName: string, mi?: string): string {
    let fullName = `${lastName}, ${firstName}`;
    if (mi) {
        fullName += ` ${mi}.`;
    }
    return fullName;
}