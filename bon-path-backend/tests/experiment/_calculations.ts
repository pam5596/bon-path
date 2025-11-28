export function textSimilarity(a: number[], b: number[]) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (normA * normB);
}

export function precision(TP: number, FP: number) {
    return TP / (TP + FP)
}

export function recall(TP: number, FN: number) {
    return TP / (TP + FN)
}

export function F1(TP: number, FP: number, FN: number) {
    return 2 * ((precision(TP,FP)*recall(TP, FN)) / (precision(TP,FP)+recall(TP, FN)))
}

export function average(numbers: number[]) {
    return numbers.reduce((sum, v) => sum + v, 0) / numbers.length
}