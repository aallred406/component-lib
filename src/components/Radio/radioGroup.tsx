import { RadioContext } from "./radio-context";
import { styled } from "styled-components";
import { StyledLabel } from "../../global/styles/styles";
import { FormValues } from "../../pages/form";

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
  state: FormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroup = ({ label, children, handleChange, state }: Props) => (
  <RadioContext.Provider value={{ state, handleChange }}>
    <Fieldset>
      <Legend>{label}</Legend>
      {children}
    </Fieldset>
  </RadioContext.Provider>
);
