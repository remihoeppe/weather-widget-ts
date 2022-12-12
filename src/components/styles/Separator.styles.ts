import styled from "styled-components";

import { theme } from "./Theme";

type Props = {
    theme: typeof theme;
    width: string;
    height: string;
    color: string;
};

export const Separator = styled.div<Props>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: ${({ color }) => color};
`;
