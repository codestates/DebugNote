import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    /* border: 1px solid orange; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;
