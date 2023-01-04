import styled from "styled-components";
import { theme } from "./Theme";

type Props = {
    htmlFor: string;
    theme: typeof theme;
};

export const StyledRadio = styled.label<Props>`
    margin-right: 100px;

    input {
        margin: 20px 20px 20px 0;
        width: 20px;
        height: 20px;
    }
`;
