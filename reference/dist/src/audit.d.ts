import type { LoanEvent } from "./types.js";
export type EventOf<T extends LoanEvent["type"]> = Extract<LoanEvent, {
    type: T;
}>;
type Listener<T extends LoanEvent["type"]> = (event: EventOf<T>) => void;
export declare class EventLog {
    #private;
    readonly events: LoanEvent[];
    on<T extends LoanEvent["type"]>(type: T, listener: Listener<T>): void;
    emit(event: LoanEvent): void;
}
/** Logs each call of the decorated method as "→ name(args)". */
export declare function traced<This, A extends unknown[], R>(method: (this: This, ...args: A) => R, context: ClassMethodDecoratorContext<This, (this: This, ...args: A) => R>): (this: This, ...args: A) => R;
export {};
