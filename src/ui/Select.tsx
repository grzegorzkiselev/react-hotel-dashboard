import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 0.8rem 1.2rem;

  font-size: 1.4rem;
  font-weight: 500;

  background-color: var(--color-grey-0);
  border: 1px solid
    ${(props) =>
    props.type === "white"
      ? "var(--color-grey-100)"
      : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;
