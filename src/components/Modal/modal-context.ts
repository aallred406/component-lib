import { createContext, useContext } from "react";

export const ModalContext = createContext({ onModalClose: () => {} });

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal must be rendered inside the ModalContext provider.");
  }
  return context;
};
