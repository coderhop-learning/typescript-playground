// Late fees and dates (Chapters 2 and 5).
export const DAY_MS = 86_400_000;
/** Cents owed for a return `daysLate` days after the due date. */
export function lateFee(daysLate, { perDay = 25, cap = 500 } = {}) {
    if (daysLate <= 0)
        return 0;
    return Math.min(daysLate * perDay, cap);
}
/** Whole days from `from` to `to` (negative if `to` is earlier), ignoring the time of day. */
export function daysBetween(from, to) {
    const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
    const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
    return Math.round((end - start) / DAY_MS);
}
export function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
export const formatCents = (cents) => `€${(cents / 100).toFixed(2)}`;
//# sourceMappingURL=fees.js.map