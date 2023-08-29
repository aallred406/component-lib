import styled from "styled-components";
import { Focus } from "../../global/styles/styles";

export const StyledButton = styled.button<{ $variant: string }>`
  border: ${({ $variant }) =>
    $variant === "select" ? "1px solid #326771" : "none"};
  border-radius: ${({ $variant }) => ($variant === "rounded" ? "40px" : "4px")};
  background: ${({ $variant }) => ($variant === "select" ? "#fff" : "#326771")};
  color: ${({ $variant }) => ($variant === "select" ? "#000" : "#fff")};

  &:focus-visible {
    ${Focus}
  }

  &:hover {
    background: ${({ $variant }) =>
      $variant === "select" ? "transparent" : "#28464b"};
    color: ${({ $variant }) => ($variant === "select" ? "#000" : "#fff")};
    outline: ${({ $variant }) =>
      $variant === "select" ? "inset 2px #28464b" : "none"};
  }
`;

type Variant = "rounded" | "select" | "default";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: Variant;
} & HTMLButtonElement;

export const Button = ({ onClick, children, variant = "default" }: Props) => (
  <StyledButton onClick={onClick} $variant={variant}>
    {children}
  </StyledButton>
);
