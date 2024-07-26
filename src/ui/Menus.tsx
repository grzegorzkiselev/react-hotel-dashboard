import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClicks } from "../hooks/useOutsideClicks";

const Menu = styled.div`
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

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, open, close, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (event) => {
    const rect = event.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id
      ? open(id)
      : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }) => {
  const { openId, close, position } = useContext(MenusContext);
  const ref = useOutsideClicks(close);

  return (openId !== id)
    ? null
    : createPortal(
      <StyledList ref={ref} position={position}>{children}</StyledList>,
      document.body,
    );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>{icon}<span>{children}</span></StyledButton >
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export { Menus };
