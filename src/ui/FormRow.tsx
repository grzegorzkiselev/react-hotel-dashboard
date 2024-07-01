import { LabelHTMLAttributes, ReactElement } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  align-items: center;

  padding: 1.2rem 0;

  &:has(button) {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Label = styled.label<LabelHTMLAttributes<HTMLLabelElement>>`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export const FormRow = ({ label, error, children }: { label?: string, error?: string, children: ReactElement }) => {
  return <StyledFormRow>
    { label && <Label htmlFor={ children.props.id }>{ label }</Label> }
    { children }
    { error && <Error>{ error }</Error>}
  </StyledFormRow>;
};