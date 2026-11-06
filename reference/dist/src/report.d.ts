export type Columns<T> = {
    [K in keyof T]?: {
        header: string;
        format?: (value: T[K]) => string;
    };
};
export declare function table<T extends object>(rows: readonly T[], columns: Columns<T>): string;
