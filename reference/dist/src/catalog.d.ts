import { BookId } from "./ids.js";
import { type Book } from "./types.js";
/** Checks one raw value from JSON and returns a Book, or throws with the reason. */
export declare function parseBook(raw: unknown): Book;
export declare class Catalog {
    #private;
    static fromJson(text: string): Catalog;
    add(book: Book): this;
    find(id: BookId): Book | undefined;
    search(text: string): Book[];
    all(): Book[];
    get size(): number;
}
