import { css } from "lit";

export const iconButtonStyles = css`
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  button:hover {
    opacity: 0.8;
  }
  i {
    font-size: var(--icon-size, 16px);
    color: var(--icon-color, black);
  }
`;
