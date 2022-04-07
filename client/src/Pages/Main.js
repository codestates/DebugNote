import './Main.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  height: 14rem;
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

export default function Main({ isLogin, handleResponseSuccess }) {
  // console.log(isLogin, '로그인 상태');
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [signinID, setSigninID] = useState('');
  const [signinPW, setSigninPW] = useState('');

  const openLoginModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const signupHandler = () => {
    setIsMember(!isMember);
  };

  const loginInputIDHandler = event => {
    setSigninID(event.target.value);
  };

  const loginInputPWHandler = event => {
    setSigninPW(event.target.value);
  };

  const loginHandler = () => {
    if (signinID === '' || signinPW === '') {
      return;
    }

    axios
      .post(
        '엔드포인트주소',
        {
          signinID,
          signinPW,
        },
        {
          headers: { Accept: 'application/json' },
        },
      )
      .then(response => {
        console.log(response.statusCode, '응답코드');
        if (response.statusCode === 201) {
          console.log(response.cookies, '응답으로 받아온 쿠키');
          handleResponseSuccess();
        }
      });
  };

  const logoutHandler = () => {};

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
            <span onClick={openLoginModalHandler} className="close-btn">
              &times;
            </span>
            <section>
              {isMember ? (
                <>
                  <header>로그인</header>
                  <div>소셜 로그인 버튼</div>
                  <section>
                    <div>
                      <div>ID</div>
                      <input
                        placeholder="아이디를 입력하세요"
                        value={signinID}
                        onChange={loginInputIDHandler}
                      ></input>
                    </div>
                    <div>
                      <div>PASSWORD</div>
                      <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={signinPW}
                        onChange={loginInputPWHandler}
                      ></input>
                    </div>
                    <button onClick={loginHandler}>로그인</button>
                  </section>
                  <div onClick={signupHandler}>
                    아직 회원이 아니신가요? 회원가입
                  </div>
                </>
              ) : (
                <>
                  <header>회원가입</header>
                  <div>소셜 회원가입</div>
                  <section>
                    <div>
                      <div>email</div>
                      <input placeholder="이메일을 입력하세요"></input>
                      <div>유효성검사안내</div>
                    </div>
                    <div>
                      <div>password</div>
                      <input placeholder="비밀번호를 입력하세요"></input>
                      <div>유효성검사안내</div>
                    </div>
                    <div>
                      <div>password 확인</div>
                      <input placeholder="비밀번호를 한번 더 입력하세요"></input>
                      <div>유효성검사안내</div>
                    </div>
                    <div>
                      <div>nickname</div>
                      <input placeholder="닉네임을 입력하세요"></input>
                      <div>유효성검사안내</div>
                    </div>
                    <div>
                      <div>name</div>
                      <input placeholder="이름을 입력하세요"></input>
                      <div>유효성검사안내</div>
                    </div>
                    <div>
                      <div>job</div>
                      <select>
                        <option>직업을 선택하세요</option>
                        <option>개발자</option>
                        <option>학생</option>
                      </select>
                    </div>
                    <button>회원가입</button>
                  </section>
                  <div onClick={signupHandler}>
                    계정이 이미 있으신가요? 로그인
                  </div>
                </>
              )}
            </section>
          </ModalView>
        </ModalBackdrop>
      ) : null}
      <section className="search">
        <select>
          <option>제목</option>
          <option>내용</option>
        </select>
        <div>
          <input placeholder="검색어를 입력해주세요"></input>
          <button>검색</button>
        </div>
      </section>
      <section className="articles">게시글영역</section>
    </div>
  );
}
