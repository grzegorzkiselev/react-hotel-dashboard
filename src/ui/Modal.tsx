import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClicks } from "../hooks/useOutsideClicks";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 3.2rem 4rem;

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);

  transition: all 0.5s;
`;

const Button = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
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

    /* Sometimes we need both */

    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
};

export const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClicks(close);

  if (name !== openName) {
    return null;
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onClose: close })}
      </StyledModal>
    </Overlay>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export { Modal };
