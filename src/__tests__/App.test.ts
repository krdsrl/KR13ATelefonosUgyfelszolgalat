import Megoldas from "../Megoldas";

describe("megoldasOsztalyTesztelese", () => {
    const instance: Megoldas = new Megoldas();
    it("negyedikFeladatTesztelese", async () => {
        expect(instance.max[1]).toBe(151);
        expect(instance.max[0]).toBe(341);
    });
    it("negyedikFeladatTesztelese", async () => {
        expect(instance.max[1]).toBe(151);
        expect(instance.max[0]).toBe(341);
    });
    it("hatodikFeladatTesztelese", async () => {
        expect(instance.utolso[0]).toBe(432);
        expect(instance.utolso[1]).toBe(184);
    });
});
