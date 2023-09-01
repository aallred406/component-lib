import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";
import { ModalContext } from "./modal-context";
import { Focus, VisuallyHidden } from "../../global/styles/styles";
import { Close } from "../../assets/close";

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(40, 70, 75, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background: #fff;
  opacity: 1;
  border: 1px solid #326771;
  width: 70vw;
  height: 70vh;
  padding: 1rem;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  &:focus-visible {
    ${Focus}
  }

  &:hover {
    background: #326771;
    color: #fff;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
`;

type ModalProps = {
  children: React.ReactNode;
  onModalClose: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const ModalHeader = ({ children }: Props) => {
  const { onModalClose } = useContext(ModalContext);

  return (
    <FlexContainer>
      {children}
      <CloseButton onClick={onModalClose}>
        <Close />
        <VisuallyHidden>Close modal</VisuallyHidden>
      </CloseButton>
    </FlexContainer>
  );
};

export const ModalBody = ({ children }: Props) => <Body>{children}</Body>;

export const ModalFooter = ({ children }: Props) => <Footer>{children}</Footer>;

export const Modal = ({ children, onModalClose }: ModalProps) => {
  const modalRef = useRef<MutableRefObject<HTMLDivElement>>(null);

  useEffect(() => {
    const keyListenerMap = new Map([
      [27, onModalClose],
      [9, handleTab],
    ]);

    function handleKeyPress(e: { keyCode: number }) {
      const listener = keyListenerMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [onModalClose]);

  function handleTab(e: { shiftKey: unknown; preventDefault: () => void }) {
    const focusableItems = modalRef.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (e.shiftKey && document.activeElement === firstItem) {
      lastItem.focus();
      return e.preventDefault();
    }

    if (!e.shiftKey && document.activeElement === lastItem) {
      firstItem.focus();
      return e.preventDefault();
    }
  }

  return createPortal(
    <ModalContext.Provider value={{ onModalClose }}>
      <ModalOverlay onClick={onModalClose}>
        <ModalWrapper role="dialog" ref={modalRef}>
          {children}
        </ModalWrapper>
      </ModalOverlay>
    </ModalContext.Provider>,
    document.body
  );
};
