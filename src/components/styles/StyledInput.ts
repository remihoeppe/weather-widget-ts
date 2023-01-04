import styled from "styled-components";
import { theme } from "./Theme";

type Props = {
    theme: typeof theme;
};

export const StyledInputText = styled.div<Props>`
    display: flex;
    flex-direction: column;

    input {
        font-size: 1em;
        padding: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 2px solid #ccc;
    }
`;
