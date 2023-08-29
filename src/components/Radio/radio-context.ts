import { SetStateAction, createContext, useContext } from "react";

export const RadioContext = createContext({
  selected: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleChange: (e: { target: { value: SetStateAction<string> } }) => {},
});

export const useRadioContext = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error(
      "Radio buttons must be rendered inside the RadioGroup component"
    );
  }
  return context;
};
