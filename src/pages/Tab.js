import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  background: transparent;
  font-family: Open Sans;
  height: 3em;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 30%;
  //   position: relative;
  margin-right: 0.1em;
  font-size: 1em;
  //   border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "#f79368" : "#ffffd1")};
  height: ${(props) => (props.active ? "2.6em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;
  border-radius: 10px;
  margin-left: 1vw;

  //   :hover {
  //     background-color: #fbb03b;
  //     color: Black;
  //   }
`;
export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;
