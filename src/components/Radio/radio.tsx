import styled from "styled-components";
import { Focus, StyledLabel } from "../../global/styles/styles";
import { useRadioContext } from ".";

const Input = styled.input`
  appearance: none;
  background: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  border: 1px solid currentColor;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  display: grid;
  place-content: center;

  &:before {
    content: "";
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #28464b;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    ${Focus}
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${StyledLabel}
`;

type RadioProps = {
  name: string;
  label: string;
  value: string;
};

export const Radio = ({ name, label, value }: RadioProps) => {
  const { selected, handleChange } = useRadioContext();
  return (
    <Label>
      <Input
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={(e) => handleChange(e)}
      />
      {label}
    </Label>
  );
};
