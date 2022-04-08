import './Main.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../Components/NavigationBar';
import SigninForm from '../Components/SigninForm';
import SignupForm from '../Components/SignupForm';
import Searchbar from '../Components/Searchbar';
import LoadingIndicator from '../Components/LoadingIndicator';
import FailIndicator from '../Components/FailIndicator';
import ErrorLog from '../Components/ErrorLog';

import allArticleApi from '../api/allArticleApi';

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
//ajax call 단 1회만 호출되도록 설정.
const articleData = allArticleApi();

export default function Main({ isLogin, setIsLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);

  //화면에 표시되는 게시글: 검색된 게시글일 수도 있고, 서버가 기본적으로 보내주는 게시글일 수도 있다.
  const [currentArticle, setCurrentArticle] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //검색창 하단 기본 게시물 노출을 위한 useEffect 호출:
  useEffect(() => {
    setIsLoading(true);
    //서버에 전체 게시글 요청
    articleData
      .then(response => {
        if (response.status === 200) {
          //전체 게시글 불러오기 성공
          console.log('전체 게시글 불러오기 성공');
          setCurrentArticle(response.data.boards);
          setIsLoading(false);
        } else {
          //전체 게시글 불러오기 실패
          console.log('전체 게시글 불러오기 실패');
          setCurrentArticle([]);
          setIsLoading(false);
        }
      })
      .catch(error => console.log(error, '에러 내용'));
  }, []);

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

  return (
    <div>
      <Navbar
        isLogin={isLogin}
        logoutHandler={logoutHandler}
        openLoginModalHandler={openLoginModalHandler}
      ></Navbar>
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
        {/*useEffect을 통해 전체 게시글을 보여줄 부분*/}
        {isLoading ? (
          <LoadingIndicator />
        ) : currentArticle.length !== 0 ? (
          currentArticle.map(article => (
            <ErrorLog key={article.id} article={article} />
          ))
        ) : (
          <FailIndicator />
        )}
      </section>
    </div>
  );
}
