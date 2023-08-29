import styled, { css } from "styled-components";

export const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const Focus = css`
  outline: transparent;
  box-shadow: 0px 0px 0px 4px #42d9c8;
`;

export const StyledLabel = css`
  font-size: 1rem;
  font-weight: bold;
`;
