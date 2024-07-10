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

export const Select = ({ options, value, onChange, ...props }) => {
  return (
    <StyledSelect value={value} onChange={onChange} {...props} >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
        >
          {option.label}
        </option >
      ))}
    </StyledSelect >
  );
};
