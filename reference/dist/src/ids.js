function maker(prefix, kind) {
    const pattern = new RegExp(`^${prefix}\\d+$`);
    return (s) => {
        if (!pattern.test(s))
            throw new TypeError(`invalid ${kind}: ${JSON.stringify(s)}`);
        return s;
    };
}
export const BookId = maker("b", "book id");
export const MemberId = maker("m", "member id");
export const LoanId = maker("L", "loan id");
//# sourceMappingURL=ids.js.map