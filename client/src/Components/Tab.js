import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Tabul = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Tabli = styled.li`
  position: relative;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  font-size: 1.5rem;
  color: #a4a8a4;
  &:hover {
    color: #82a382;
    & > div {
      visibility: visible;
    }
  }
`;
const Tooltip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 80px;
  height: 20px;
  background-color: #545654;
  color: white;
  font-size: 0.4rem;
  position: absolute;
  visibility: hidden;
  z-index: 1;
  left: 105%;
`;

export default function Tab() {
  return (
    <aside>
      <Tabul>
        <Link to="logs">
          <Tabli>
            <i className="fa-solid fa-bug"></i>
            <Tooltip>나의 에러 로그</Tooltip>
          </Tabli>
        </Link>
        <Link to="bookmarks">
          <Tabli>
            <i className="fa-solid fa-bookmark"></i>
            <Tooltip>북마크</Tooltip>
          </Tabli>
        </Link>
        <Link to="info">
          <Tabli>
            <i className="fa-solid fa-gear"></i>
            <Tooltip>회원정보 수정</Tooltip>
          </Tabli>
        </Link>
      </Tabul>
    </aside>
  );
}
