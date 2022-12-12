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
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        input {
            font-size: 1em;
            padding: 10px;
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: 2px solid #ccc;
        }

        div {
            display: flex;
            justify-content: flex-start;

            label {
                margin-right: 100px;

                input {
                    margin: 20px 20px 20px 0;
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
`;
