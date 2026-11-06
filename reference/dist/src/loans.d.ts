import { type EventLog } from "./audit.js";
import type { Catalog } from "./catalog.js";
import { LoanId, type BookId, type MemberId } from "./ids.js";
import type { MemberDirectory } from "./members.js";
import { InMemoryRepository } from "./repository.js";
import type { Loan, Result } from "./types.js";
export declare const LoanStatus: {
    readonly Active: "active";
    readonly Overdue: "overdue";
    readonly Returned: "returned";
};
export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus];
export declare function statusOf(loan: Pick<Loan, "due" | "returnedOn">, today: Date): LoanStatus;
export interface Returned {
    loan: Loan;
    lateDays: number;
    fee: number;
}
export declare class LoanService {
    #private;
    readonly loans: InMemoryRepository<Loan>;
    constructor(catalog: Catalog, members: MemberDirectory, log: EventLog);
    openLoans(filter?: (loan: Loan) => boolean): Loan[];
    available(bookId: BookId): number;
    borrow(bookId: BookId, memberId: MemberId, today: Date): Result<Loan>;
    giveBack(loanId: LoanId, today: Date): Result<Returned>;
}
