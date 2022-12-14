import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import WeatherEditor from "./WeatherEditor";

const mockProps: any = {
    tempUnit1: "F",
    tempUnit2: "C",
    widgetTitle: "Sydney",
    windOn: true,
    onTitleChange: vi.fn((e: any) => (mockProps.widgetTitle = e.target.value)),
    onTempUnitChange: vi.fn((e: any) => e.target.value),
    onWindDisplayChange: vi.fn((e: any) => e.target.value),
};

describe("Testing WeatherEditor", () => {
    beforeEach(async () => {
        await render(
            <WeatherEditor
                onTitleChange={mockProps.onTitleChange}
                onTempUnitChange={mockProps.onTempUnitChange}
                onWindDisplayChange={mockProps.onWindDisplayChange}
                tempUnit={mockProps.tempUnit1}
                isWindOn={mockProps.windOn}
            />,
        );
    });

    afterEach(async () => {
        await vi.clearAllMocks();
    });

    it("should call onTitleChange function when user input text for Widget Title", async () => {
        const user = userEvent.setup();
        const input = screen.getByRole("textbox", { name: "Title" });
        await user.type(input, "Bali");
        expect(mockProps.onTitleChange).toBeCalledTimes(4);
    });

    it("should reset the title when the user clears the input", async () => {
        const user = userEvent.setup();
        const input = screen.getByRole("textbox", { name: "Title" });
        await user.clear(input);
        expect(input).toHaveTextContent("");
    });

    it("should call onTempChange function when user click on Temperature radio button", async () => {
        const user = userEvent.setup();
        const radioC = screen.getByRole("radio", { name: "°C" });
        await user.click(radioC);
        expect(mockProps.onTempUnitChange).toHaveBeenCalled();
    });

    it("should call onTempChange EVERY time any Temperature radio is called", async () => {
        const user = userEvent.setup();
        const radioC = screen.getByRole("radio", { name: "°C" });
        await user.click(radioC);
        const radioF = screen.getByRole("radio", { name: "°F" });
        await user.click(radioF);
        await user.click(radioC);
        expect(mockProps.onTempUnitChange).toBeCalledTimes(3);
    });

    it("should call onWindDisplayChange function when user click on wind radio button", async () => {
        const user = userEvent.setup();
        const windOn = screen.getByRole("radio", { name: "On" });
        await user.click(windOn);
        expect(mockProps.onWindDisplayChange).toHaveBeenCalled();
    });
});
