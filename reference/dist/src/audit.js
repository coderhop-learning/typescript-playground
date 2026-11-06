export class EventLog {
    events = [];
    #listeners = {};
    on(type, listener) {
        const list = (this.#listeners[type] ??= []);
        list.push(listener);
    }
    emit(event) {
        this.events.push(event);
        const list = this.#listeners[event.type];
        list?.forEach((fn) => fn(event));
    }
}
/** Logs each call of the decorated method as "→ name(args)". */
export function traced(method, context) {
    const name = String(context.name);
    return function (...args) {
        const shown = args.map((a) => (a instanceof Date ? a.toDateString() : String(a)));
        console.log(`→ ${name}(${shown.join(", ")})`);
        return method.call(this, ...args);
    };
}
//# sourceMappingURL=audit.js.map