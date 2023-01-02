import { assert, expect, test } from "vitest";
import { degToCompass, mpsToKph } from "../windUtils";

describe("Tests the compassSegement function", () => {
    it("Should return right Cardinal Direction when given a certain angle", () => {
        expect(degToCompass(0)).toBe("N");
        expect(degToCompass(90)).toBe("E");
        expect(degToCompass(180)).toBe("S");
        expect(degToCompass(270)).toBe("W");
        expect(degToCompass(45)).toBe("NE");
    });

    it("Should handle undedfined", () => {
        expect(degToCompass(undefined)).toBe("---");
    });
});

describe("Tests the mpsToKph function", () => {
    it("Should return kph speed when passed a positive mps value", () => {
        expect(mpsToKph(12)).toBe(43);
        expect(mpsToKph(5)).toBe(18);
        expect(mpsToKph(9)).toBe(32);
        expect(mpsToKph(21)).toBe(76);
    });

    it("Should handle undedfined and zero", () => {
        expect(mpsToKph(undefined)).toBe(0);
        expect(mpsToKph(0)).toBe(0);
    });
});
