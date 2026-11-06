export declare const DAY_MS = 86400000;
export interface FeeOptions {
    perDay?: number;
    cap?: number;
}
/** Cents owed for a return `daysLate` days after the due date. */
export declare function lateFee(daysLate: number, { perDay, cap }?: FeeOptions): number;
/** Whole days from `from` to `to` (negative if `to` is earlier), ignoring the time of day. */
export declare function daysBetween(from: Date, to: Date): number;
export declare function addDays(date: Date, days: number): Date;
export declare const formatCents: (cents: number) => string;
