// Members, stored in the generic repository (Chapters 8 and 9).
import { MemberId } from "./ids.js";
import { InMemoryRepository } from "./repository.js";
import { LOAN_POLICY } from "./types.js";
const isMemberType = (v) => typeof v === "string" && Object.hasOwn(LOAN_POLICY, v);
export function parseMember(raw) {
    if (typeof raw !== "object" || raw === null)
        throw new TypeError("member must be an object");
    const r = raw;
    if (typeof r.id !== "string" || typeof r.name !== "string")
        throw new TypeError("member.id and member.name must be strings");
    if (!isMemberType(r.type))
        throw new TypeError(`unknown member type: ${String(r.type)}`);
    const member = { id: MemberId(r.id), name: r.name, type: r.type };
    if (typeof r.email === "string")
        member.email = r.email;
    return member;
}
export class MemberDirectory extends InMemoryRepository {
    static fromJson(text) {
        const data = JSON.parse(text);
        if (!Array.isArray(data))
            throw new TypeError("members must be an array");
        const dir = new MemberDirectory();
        for (const raw of data)
            dir.add(parseMember(raw));
        return dir;
    }
    policyFor(id) {
        const member = this.get(id);
        return member === undefined ? undefined : LOAN_POLICY[member.type];
    }
}
//# sourceMappingURL=members.js.map