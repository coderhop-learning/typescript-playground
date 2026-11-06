import { MemberId } from "./ids.js";
import { InMemoryRepository } from "./repository.js";
import { type Member } from "./types.js";
export declare function parseMember(raw: unknown): Member;
export declare class MemberDirectory extends InMemoryRepository<Member> {
    static fromJson(text: string): MemberDirectory;
    policyFor(id: MemberId): {
        readonly maxLoans: 3;
        readonly days: 21;
    } | {
        readonly maxLoans: 10;
        readonly days: 42;
    } | {
        readonly maxLoans: 1;
        readonly days: 7;
    } | undefined;
}
