import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  transform: translateX(0.8rem);

  padding: 0.4rem;

  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  top: ${(props) => props.position.y}px;
  right: ${(props) => props.position.x}px;

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const StyledButton = styled.button`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  width: 100%;
  padding: 1.2rem 2.4rem;

  font-size: 1.4rem;
  text-align: left;

  background: none;
  border: none;

  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
