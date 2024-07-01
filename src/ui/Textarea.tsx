import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

export const Textarea = styled.textarea<TextareaHTMLAttributes<HTMLTextAreaElement>>`
  width: 100%;
  height: 8rem;
  padding: 0.8rem 1.2rem;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;
