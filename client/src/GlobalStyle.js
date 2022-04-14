import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 100vw; */
  }
  
  ul{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;
