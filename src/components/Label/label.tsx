import styled from "styled-components";
import { StyledLabel, VisuallyHidden } from "../../global/styles/styles";

const LabelWrap = styled.label`
  ${StyledLabel}
`;

type Props = {
  htmlFor?: string;
  children: React.ReactNode;
  isHidden?: boolean;
} & HTMLLabelElement;

export const Label = ({ htmlFor, children, isHidden = false }: Props) => (
  <LabelWrap htmlFor={htmlFor}>
    {isHidden ? (
      <VisuallyHidden>{children}</VisuallyHidden>
    ) : (
      <span>{children}</span>
    )}
  </LabelWrap>
);
