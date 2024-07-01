import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const P = styled.p`
  margin-left: 0.8rem;
  font-size: 1.4rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  padding: 0.6rem 1.2rem;

  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};

  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  border: none;
  border-radius: var(--border-radius-sm);

  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover:not(:disabled) {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
  }
`;
