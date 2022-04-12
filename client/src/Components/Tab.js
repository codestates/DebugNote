import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Tabul = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Tabli = styled.li`
  padding: 0.5rem;
  display: flex;
  justify-content: flex;
  align-items: center;
`;

export default function Tab() {
  return (
    <aside>
      <Tabul>
        <Tabli>
          <Link to="logs">내 에러 로그</Link>
        </Tabli>
        <Tabli>
          <Link to="bookmarks">북마크</Link>
        </Tabli>
        <Tabli>
          <Link to="info">회원정보 수정</Link>
        </Tabli>
      </Tabul>
    </aside>
  );
}
