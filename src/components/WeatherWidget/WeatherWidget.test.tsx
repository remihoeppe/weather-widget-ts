import { render, screen } from "@testing-library/react";
import WeatherWidget from "./WeatherWidget";

const mockProps: any = {
    weatherData: {
        weather: [{ icon: "02d" }],
        main: { temp: 29 },
        wind: { speed: 10 },
    },
    isWindOn: true,
    tempUnit: "C",
    widgetTitle: "My Widget",
    location: {
        name: "Bali",
    },
};

describe("Testing WeatherEditor", () => {
    beforeEach(async () => {
        await render(
            <WeatherWidget
                weatherData={mockProps.weatherData}
                location={mockProps.location}
                widgetTitle={mockProps.widgetTitle}
                tempUnit={mockProps.tempUnit}
                isWindOn={mockProps.isWindOn}
            />,
        );
    });

    it("should display the right Widget Title", async () => {
        const title = screen.getByRole("heading", { level: 2 });
        expect(title).toHaveTextContent(mockProps.widgetTitle);
    });

    it("should display the right location", async () => {
        const location = screen.getByRole("heading", { level: 4 });
        expect(location).toHaveTextContent(mockProps.location.name);
    });

    it("should display the right temperature unit", async () => {
        const temp = screen.getByRole("heading", { level: 3 });
        expect(temp).toHaveTextContent(mockProps.weatherData.main.temp);
        // Need to had some Regex to check on the unit itself
    });

    it("should display the wind data if the related prop is set to true", async () => {
        const wind = screen.queryByText(/wind/i);
        if (mockProps.isWindOn) {
            expect(wind).toBeInTheDocument();
        } else {
            expect(wind).not.toBeInTheDocument();
        }
    });

    it("should display the updated props when the components re-renders on the DOM", async () => {
        const { rerender } = render(
            <WeatherWidget
                weatherData={{
                    weather: [{ icon: "02d" }],
                    main: { temp: 35 },
                    wind: { speed: 3 },
                }}
                location={{ name: "Paris" }}
                widgetTitle={"New Title"}
                tempUnit={"F"}
                isWindOn={false}
            />,
        );
    });
});

describe("Testing re-rendering of WeatherWidget", async () => {
    beforeEach(() => {
        const { rerender } = render(
            <WeatherWidget
                weatherData={mockProps.weatherData}
                location={mockProps.location}
                widgetTitle={mockProps.widgetTitle}
                tempUnit={mockProps.tempUnit}
                isWindOn={mockProps.isWindOn}
            />,
        );

        rerender(
            <WeatherWidget
                weatherData={{
                    weather: [{ icon: "02d" }],
                    main: { temp: 85 },
                    wind: { speed: 3 },
                }}
                location={{ name: "Paris" }}
                widgetTitle={"New Title"}
                tempUnit={"F"}
                isWindOn={false}
            />,
        );
    });

    it("should display the right Widget Title", async () => {
        const title = screen.getByRole("heading", { level: 2 });
        expect(title).toHaveTextContent("New Title");
    });

    it("should display the right location", async () => {
        const location = screen.getByRole("heading", { level: 4 });
        expect(location).toHaveTextContent("Paris");
    });

    it("should display the right temperature unit", async () => {
        const temp = screen.getByRole("heading", { level: 3, hidden: true });
        expect(temp).toHaveTextContent("85°F");
        // Need to had some Regex to check on the unit itself
    });

    it("checks that when the isWind prop is false the wind data is not displayed ", async () => {
        const wind = screen.queryByText(/wind/i);
        expect(wind).not.toBeInTheDocument();
    });
});
