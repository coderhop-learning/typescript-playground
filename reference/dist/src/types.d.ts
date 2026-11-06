import type { BookId, LoanId, MemberId } from "./ids.js";
export declare const FORMATS: readonly ["hardcover", "paperback", "ebook"];
export type Format = (typeof FORMATS)[number];
export interface Book {
    readonly id: BookId;
    title: string;
    author: string;
    year: number;
    format: Format;
    copies: number;
}
export declare const LOAN_POLICY: {
    readonly student: {
        readonly maxLoans: 3;
        readonly days: 21;
    };
    readonly staff: {
        readonly maxLoans: 10;
        readonly days: 42;
    };
    readonly guest: {
        readonly maxLoans: 1;
        readonly days: 7;
    };
};
export type MemberType = keyof typeof LOAN_POLICY;
export interface Member {
    readonly id: MemberId;
    name: string;
    type: MemberType;
    email?: string;
}
export interface Loan {
    readonly id: LoanId;
    bookId: BookId;
    memberId: MemberId;
    borrowedOn: Date;
    due: Date;
    returnedOn?: Date;
}
/** Success or a reason, without exceptions (Chapter 4). */
export type Result<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    reason: string;
};
export type LoanEvent = {
    type: "borrowed";
    loanId: LoanId;
    bookId: BookId;
    memberId: MemberId;
} | {
    type: "returned";
    loanId: LoanId;
    lateDays: number;
} | {
    type: "fined";
    loanId: LoanId;
    cents: number;
};
