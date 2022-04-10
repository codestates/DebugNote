import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menunav = styled.nav`
  border: 1px solid orange;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  height: 4rem;
`;

const Menuul = styled.ul`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 100%;
`;

const Menuli = styled.li`
  flex: 1;
`;

export default function Navbar(props) {
  console.log(props, '프롭스로 내려준것들');
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
