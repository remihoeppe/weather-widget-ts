import styled from "styled-components";

import { theme } from "./Theme";

type Props = {
    theme: typeof theme;
};

export const StyledEditor = styled.div<Props>`
    width: 450px;
    color: ${({ theme }) => theme.colors.primaryText};

    form {
        text-align: left;
    }
`;
