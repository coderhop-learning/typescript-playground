declare const brand: unique symbol;
type Brand<T, B extends string> = T & {
    readonly [brand]: B;
};
export type BookId = Brand<string, "BookId">;
export type MemberId = Brand<string, "MemberId">;
export type LoanId = Brand<string, "LoanId">;
export declare const BookId: (s: string) => BookId;
export declare const MemberId: (s: string) => MemberId;
export declare const LoanId: (s: string) => LoanId;
export {};
