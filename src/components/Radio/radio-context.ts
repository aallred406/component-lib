import { createContext, useContext } from "react";

export const RadioContext = createContext({
  state: { likeIt: { value: "", checked: false }, selection: "" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
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
