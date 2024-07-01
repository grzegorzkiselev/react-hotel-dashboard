import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })<InputHTMLAttributes<HTMLInputElement>>`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    cursor: pointer;

    margin-right: 1.2rem;
    padding: 0.8rem 1.2rem;

    font: inherit;
    font-weight: 500;
    color: var(--color-brand-50);

    background-color: var(--color-brand-600);
    border: none;
    border-radius: var(--border-radius-sm);

    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
