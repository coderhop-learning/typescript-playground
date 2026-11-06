export function table(rows, columns) {
    const keys = Object.keys(columns);
    const cell = (row, key) => {
        const col = columns[key];
        return col.format ? col.format(row[key]) : String(row[key]);
    };
    const grid = [keys.map((k) => columns[k].header), ...rows.map((r) => keys.map((k) => cell(r, k)))];
    const widths = keys.map((_, i) => Math.max(...grid.map((line) => line[i].length)));
    return grid.map((line) => line.map((c, i) => c.padEnd(widths[i])).join("  ").trimEnd()).join("\n");
}
//# sourceMappingURL=report.js.map