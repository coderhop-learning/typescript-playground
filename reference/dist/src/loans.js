var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
// Borrowing and returning: discriminated unions, Result values and status derivation (Chapters 4, 12, 13).
import { traced } from "./audit.js";
import { addDays, daysBetween, lateFee } from "./fees.js";
import { LoanId } from "./ids.js";
import { InMemoryRepository } from "./repository.js";
export const LoanStatus = { Active: "active", Overdue: "overdue", Returned: "returned" };
export function statusOf(loan, today) {
    if (loan.returnedOn !== undefined)
        return LoanStatus.Returned;
    return daysBetween(loan.due, today) > 0 ? LoanStatus.Overdue : LoanStatus.Active;
}
let LoanService = (() => {
    let _instanceExtraInitializers = [];
    let _borrow_decorators;
    let _giveBack_decorators;
    return class LoanService {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _borrow_decorators = [traced];
            _giveBack_decorators = [traced];
            __esDecorate(this, null, _borrow_decorators, { kind: "method", name: "borrow", static: false, private: false, access: { has: obj => "borrow" in obj, get: obj => obj.borrow }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _giveBack_decorators, { kind: "method", name: "giveBack", static: false, private: false, access: { has: obj => "giveBack" in obj, get: obj => obj.giveBack }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        loans = (__runInitializers(this, _instanceExtraInitializers), new InMemoryRepository());
        #next = 1;
        #catalog;
        #members;
        #log;
        constructor(catalog, members, log) {
            this.#catalog = catalog;
            this.#members = members;
            this.#log = log;
        }
        openLoans(filter = () => true) {
            return this.loans.list((l) => l.returnedOn === undefined && filter(l));
        }
        available(bookId) {
            const book = this.#catalog.find(bookId);
            return book === undefined ? 0 : book.copies - this.openLoans((l) => l.bookId === bookId).length;
        }
        borrow(bookId, memberId, today) {
            const book = this.#catalog.find(bookId);
            if (book === undefined)
                return { ok: false, reason: `no book ${bookId}` };
            const policy = this.#members.policyFor(memberId);
            if (policy === undefined)
                return { ok: false, reason: `no member ${memberId}` };
            if (this.available(bookId) <= 0)
                return { ok: false, reason: `"${book.title}" has no copies left` };
            const open = this.openLoans((l) => l.memberId === memberId).length;
            if (open >= policy.maxLoans)
                return { ok: false, reason: `loan limit (${policy.maxLoans}) reached` };
            const loan = this.loans.add({
                id: LoanId(`L${this.#next++}`), bookId, memberId, borrowedOn: today, due: addDays(today, policy.days),
            });
            this.#log.emit({ type: "borrowed", loanId: loan.id, bookId, memberId });
            return { ok: true, value: loan };
        }
        giveBack(loanId, today) {
            const loan = this.loans.get(loanId);
            if (loan === undefined)
                return { ok: false, reason: `no loan ${loanId}` };
            if (loan.returnedOn !== undefined)
                return { ok: false, reason: `loan ${loanId} is already returned` };
            const lateDays = Math.max(0, daysBetween(loan.due, today));
            const fee = lateFee(lateDays);
            const updated = this.loans.update(loanId, { returnedOn: today });
            this.#log.emit({ type: "returned", loanId, lateDays });
            if (fee > 0)
                this.#log.emit({ type: "fined", loanId, cents: fee });
            return { ok: true, value: { loan: updated, lateDays, fee } };
        }
    };
})();
export { LoanService };
//# sourceMappingURL=loans.js.map