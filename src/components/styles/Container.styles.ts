import styled from "styled-components";

import { theme } from "./Theme";

type Props = {
    theme: typeof theme;
};

export const StyledContainer = styled.section<Props>`
    width: 90%;
    min-width: 1032px;
    height: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    border: 2px solid ${({ theme }) => theme.colors.primaryBorder};
    border-radius: 0 0 10px 10px;
`;
