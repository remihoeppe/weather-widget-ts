import styled from "styled-components";
import { theme } from "./Theme";

type Props = {
    theme: typeof theme;
};

export const StyledWidget = styled.div<Props>`
    color: ${({ theme }) => theme.colors.primaryText};
    width: 450px;
    height: 275px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.widget};
    padding: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    img {
        width: 200px;
    }

    h2 {
        padding: 20px;
        display: flex;
        padding-left: 40px;
        text-transform: uppercase;
    }

    > div {
        display: flex;
        justify-content: space-around;

        h3 {
            font-weight: bold;
            font-size: 54px;
        }

        h4 {
            font-weight: normal;
        }

        p {
            font-size: 20px;

            span {
                font-weight: bold;
            }
        }
    }

    .weather-info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        width: 50%;
    }
`;
