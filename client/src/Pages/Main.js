import './Main.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SigninForm from '../Components/SigninForm';
import SignupForm from '../Components/SignupForm';
import Searchbar from '../Components/Searchbar';
import LoadingIndicator from '../Components/LoadingIndicator';
import FailIndicator from '../Components/FailIndicator';
import ErrorLog from '../Components/ErrorLog';
//* practice
import Pagination from '../Components/Pagination';

export const ModalBackdrop = styled.div`
  position: fixed; //전체화면에 깔리도록..
  z-index: 999; //가장 큰 인덱스는 가장 위에 올라오게 되는데, 확장성을 고려해서 이후에 다른 요소에 의해 배경이 깔리지 않도록 하는것이다.
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4); //opacity속성은 상속되므로 사용 안한다.
  display: grid;
  place-items: center; // 배경 가운데 오는 아이템을 가운데 오도록 만드는 속성
`;

export const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 350px;
  height: 600px;
  justify-content: center;
  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`;

export default function Main({ isLogin, setIsLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [currentArticle, setCurrentArticle] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //* 페이지네이션
  //* 현재 클릭한 페이지, 서버로 부터 받은 총 게시글 수 상태값
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const openLoginModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const modalToggleHandler = () => {
    setIsMember(!isMember);
  };

  const logoutHandler = () => {
    axios.post('http://15.164.104.171:80/auth/logout').then(response => {
      if (response.status === 200) {
        console.log('logout ok');
        setIsLogin(!isLogin);
      }
    });
  };

  const paginationHandler = currentPage => {
    //* start, limit
    const [S, L] = [currentPage * 10 - 9, currentPage * 10];

    axios
      .get(`http://15.164.104.171/?start=${S}&limit=${L}`, {
        // 페이지, 페이지 시작번호는  상태로 관리 필요. 최신순으로 화면에 구현
        headers: { Accept: 'application/json' },
      })
      .then(response => {
        console.log('axios 요청 횟수', response.data.boards);
        if (response.status === 200) {
          setCurrentArticle(response.data.boards); // 키 값은 board인가요?

          //! 추후 서버에서 받은 총 게시물 수로 대체
          setTotalArticles(15);

          setIsLoading(false); //로딩 종료
          setIsOk(true);
        } else {
          console.log('게시물부르기실패');
          setIsLoading(false); //일단 로딩화면 종료
          //전체 게시물 불러오기 실패
          setIsOk(false);
          //게시물 불러오기에 실패했다는 화면 보여주기
        }
      })
      .catch(console.log);
  };

  //검색창 하단 기본 게시물 노출을 위한 useEffect 호출:
  useEffect(() => {
    console.log('useEffect 실행');
    setIsLoading(true);
    paginationHandler(currentPage);
  }, [currentPage]);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">DebugNote</Link>
          </li>
          {isLogin ? (
            <ul className="loggedin-menu">
              <li>
                <Link to="">마이페이지</Link>
              </li>
              <li>
                <Link to="">글쓰기</Link>
              </li>
              <li onClick={logoutHandler}>로그아웃</li>
            </ul>
          ) : (
            <li onClick={openLoginModalHandler}>로그인</li>
          )}
        </ul>
      </nav>
      {isOpen === true ? (
        <ModalBackdrop onClick={openLoginModalHandler}>
          <ModalView onClick={e => e.stopPropagation()}>
            <div onClick={openLoginModalHandler} className="close-btn">
              &times;
            </div>
            <section>
              {isMember ? (
                <SignupForm
                  modalToggleHandler={modalToggleHandler}
                  openLoginModalHandler={openLoginModalHandler}
                />
              ) : (
                <SigninForm
                  modalToggleHandler={modalToggleHandler}
                  openLoginModalHandler={openLoginModalHandler}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
              )}
            </section>
          </ModalView>
        </ModalBackdrop>
      ) : null}
      <Searchbar setCurrentArticle={setCurrentArticle} />
      <section className="articles">
        <div className="main-errlog-list-title">트렌딩</div>
        <div>총 게시글 수:{totalArticles}</div>
        {/*useEffect을 통해 전체 게시글을 보여줄 부분. 우선은 로딩 여부에 따라서 보여주기*/}
        {isLoading ? (
          <LoadingIndicator />
        ) : isOk ? (
          currentArticle.map(article => (
            <ErrorLog key={article.id} article={article} />
          ))
        ) : (
          <FailIndicator />
        )}
        <Pagination
          totalArticles={totalArticles}
          paginate={setCurrentPage}
        ></Pagination>
      </section>
    </div>
  );
}
