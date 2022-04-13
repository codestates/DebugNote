import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menunav = styled.nav`
  /* border: 1px solid blue; */
  /* background-color: #8fbc8f; */
  width: 100vw;
  height: 4.688em;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7 1rem;
`;

const Menuul = styled.ul`
  /* border: 1px solid black; */
  /* padding: 0 1rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 96%;
  > .loggedin-menu {
    width: 20rem;
    /* border: 1px solid pink; */
    display: flex;
    justify-content: flex-end;
    > li {
      font-weight: bold;
      color: #000000;
    }
  }
  li:not(.logo) {
    /* border: 1px solid orange; */
    margin-left: 1rem;
    border-radius: 3px;
    padding: 0.4rem 0.6rem;
    color: #000000;
    font-weight: bold;
    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
    }
    &:hover {
      background-color: #a3cca3;
      color: white;
    }
  }
`;
/*logo*/
const Menuli = styled.li`
  /* border: 1px solid gray; */
  flex: 1;
  font-family: 'Abril Fatface', cursive;
  font-size: 1.8rem;
  text-decoration: none;
  /* font-weight: bold; */
  color: #8fbc8f;
`;

export default function Navbar(props) {
  // console.log(props, '프롭스로 내려준것들');
  return (
    <Menunav className="menubar">
      <Menuul>
        <Link to="/">
          <Menuli className="logo">DebugNote .</Menuli>
        </Link>
        {props.children}
      </Menuul>
    </Menunav>
  );
}
