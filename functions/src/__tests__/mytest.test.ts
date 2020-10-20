test("My test", () => {
    expect(add(1, 1)).toBe(2);
});

function add(a: number, b: number): number {
    return a+b;
}