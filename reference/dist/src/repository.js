// A generic in-memory store for anything with an id (Chapter 8).
export class InMemoryRepository {
    #items = new Map();
    add(item) {
        if (this.#items.has(item.id))
            throw new Error(`duplicate id ${item.id}`);
        this.#items.set(item.id, item);
        return item;
    }
    get(id) {
        return this.#items.get(id);
    }
    update(id, changes) {
        const current = this.#items.get(id);
        if (current === undefined)
            throw new Error(`unknown id ${id}`);
        const next = { ...current, ...changes };
        this.#items.set(id, next);
        return next;
    }
    list(filter = () => true) {
        return [...this.#items.values()].filter(filter);
    }
}
//# sourceMappingURL=repository.js.map