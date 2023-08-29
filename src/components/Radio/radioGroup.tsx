import { SetStateAction, useState } from "react";
import { RadioContext } from "./radio-context";
import { styled } from "styled-components";
import { StyledLabel } from "../../global/styles/styles";

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
`;

const Legend = styled.legend`
  ${StyledLabel}
`;

type Props = {
  label: string;
  children: React.ReactNode;
};

export const RadioGroup = ({ label, children }: Props) => {
  const [selected, setSelected] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    console.log("selected", e.target.value);
    setSelected(e.target.value);
  };

  return (
    <RadioContext.Provider value={{ selected, handleChange }}>
      <Fieldset>
        <Legend>{label}</Legend>
        {children}
      </Fieldset>
    </RadioContext.Provider>
  );
};
