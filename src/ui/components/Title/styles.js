import styled from "styled-components";

export const StyledTitle = styled.div`
  font-size: ${(props) => props.size + "px"};
  font-weight: ${(props) => (props.size === "72" ? "bold" : "normal")};
`;
