export declare class InMemoryRepository<T extends {
    readonly id: string;
}> {
    #private;
    add(item: T): T;
    get(id: T["id"]): T | undefined;
    update(id: T["id"], changes: Partial<Omit<T, "id">>): T;
    list(filter?: (item: T) => boolean): T[];
}
