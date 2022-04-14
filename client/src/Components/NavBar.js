import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menunav = styled.nav`
  width: 100vw;
  height: 4.688em;
  position: sticky;
  top: 0;
  background: #ffffff;
  border-bottom: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7 1rem;
  z-index: 999;
`;

const Menuul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 96%;
  > .loggedin-menu {
    width: 20rem;
    display: flex;
    justify-content: flex-end;
    > li {
      font-weight: bold;
      color: #000000;
    }
  }
  li:not(.logo) {
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
