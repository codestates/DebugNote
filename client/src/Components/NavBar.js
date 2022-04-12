import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menunav = styled.nav`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7 1rem;
  height: 4rem;
`;

const Menuul = styled.ul`
  border: 1px solid orange;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 100%;
`;

const Menuli = styled.li`
  flex: 1;

  /* > a {
    margin-left: 1rem;
  } */
`;

export default function Navbar(props) {
  // console.log(props, '프롭스로 내려준것들');
  return (
    <Menunav className="menubar">
      <Menuul>
        <Menuli>
          <Link to="/">DebugNote</Link>
        </Menuli>
        {props.children}
      </Menuul>
    </Menunav>
  );
}
