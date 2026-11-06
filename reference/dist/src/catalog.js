// The book catalogue: validation of untrusted JSON (Chapter 4) and a class with private state (Chapter 7).
import { BookId } from "./ids.js";
import { FORMATS } from "./types.js";
const isFormat = (v) => FORMATS.includes(v);
/** Checks one raw value from JSON and returns a Book, or throws with the reason. */
export function parseBook(raw) {
    if (typeof raw !== "object" || raw === null)
        throw new TypeError("book must be an object");
    const r = raw;
    for (const key of ["id", "title", "author"]) {
        if (typeof r[key] !== "string")
            throw new TypeError(`book.${key} must be a string`);
    }
    if (typeof r.year !== "number" || typeof r.copies !== "number")
        throw new TypeError("book.year and book.copies must be numbers");
    if (!isFormat(r.format))
        throw new TypeError(`unknown format: ${String(r.format)}`);
    return { id: BookId(r.id), title: r.title, author: r.author, year: r.year, format: r.format, copies: r.copies };
}
export class Catalog {
    #books = new Map();
    static fromJson(text) {
        const data = JSON.parse(text);
        if (!Array.isArray(data))
            throw new TypeError("catalogue must be an array");
        const catalog = new Catalog();
        for (const raw of data)
            catalog.add(parseBook(raw));
        return catalog;
    }
    add(book) {
        if (this.#books.has(book.id))
            throw new Error(`duplicate book id ${book.id}`);
        this.#books.set(book.id, book);
        return this;
    }
    find(id) {
        return this.#books.get(id);
    }
    search(text) {
        const q = text.toLowerCase();
        return this.all().filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(q));
    }
    all() {
        return [...this.#books.values()];
    }
    get size() {
        return this.#books.size;
    }
}
//# sourceMappingURL=catalog.js.map