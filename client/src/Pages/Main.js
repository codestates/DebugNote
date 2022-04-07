import './Main.css';
import {
  idValidator,
  pwValidator,
  pwMatchValidator,
  nicknameValidator,
  nameValidator,
  selectValidator,
} from '../Utils/validator';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ErrorLog from '../Components/ErrorLog';

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

export default function Main({ isLogin, handleResponseSuccess }) {
  // console.log(isLogin, '로그인 상태');
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [signinInfo, setSigninInfo] = useState({
    email: '',
    password: '',
  });
  //회원가입 정보 인풋값 관리
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    name: '',
    job: '',
  });

  const handleSignupInputValue = key => e => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const handleSigninInputValue = key => e => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });
  };

  const openLoginModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const modalToggleHandler = () => {
    setIsMember(!isMember);
  };

  const loginHandler = () => {
    if (signinInfo.email === '' || signinInfo.password === '') {
      return;
    }

    axios
      .post(
        'http://15.164.104.171:80/auth/login',
        {
          email: signinInfo.email,
          password: signinInfo.password,
        },
        {
          headers: { Accept: 'application/json' },
        },
      )
      .then(response => {
        console.log(response.statusCode, '응답코드');
        if (response.status === 201) {
          console.log(response.data.accToken, '응답');
          handleResponseSuccess();
        }
      })
      .catch(console.log);
  };

  const { email, password, nickname, name, job } = signupInfo;
  const signupHandler = async () => {
    //입력값 에러 처리
    console.log('ok');

    if (
      email === '' ||
      password === '' ||
      nickname === '' ||
      name === '' ||
      job === ''
    ) {
      console.log('조건문 통과함');
      return;
    }

    await axios
      .post(
        'http://15.164.104.171:80/auth/signup',
        {
          email,
          password,
          nickname,
          name,
          job,
        },
        {
          headers: { Accept: 'application/json' },
        },
      )
      .then(response => {
        if (response.status === 201) {
          console.log(`${response.data}`);
        }
      })
      .catch(console.log);
  };

  const logoutHandler = () => {
    axios.post('http://15.164.104.171:80/auth/logout').then(response => {
      if (response.status === 200) {
        console.log('logout ok');
        handleResponseSuccess();
      }
    });
  };

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
                <section>
                  <header>로그인</header>
                  <div>
                    <div>ID</div>
                    <input
                      placeholder="이메일을 입력하세요"
                      onChange={handleSigninInputValue('email')}
                    ></input>
                  </div>
                  <div>
                    <div>PASSWORD</div>
                    <input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      onChange={handleSigninInputValue('password')}
                    ></input>
                  </div>
                  <button onClick={loginHandler}>로그인</button>
                  <div onClick={modalToggleHandler}>
                    아직 회원이 아니신가요? 회원가입
                  </div>
                  <div>소셜 계정으로 로그인</div>
                  <button>github</button>
                </section>
              ) : (
                <section>
                  <header>회원가입</header>
                  <div>
                    <div>email</div>
                    <input
                      placeholder="이메일을 입력하세요"
                      onChange={handleSignupInputValue('email')}
                    ></input>
                    <div>
                      {idValidator(signupInfo.email)
                        ? '올바른 이메일 형식입니다'
                        : '이메일 형식에 맞지 않습니다'}
                    </div>
                  </div>
                  <div>
                    <div>password</div>
                    <input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      onChange={handleSignupInputValue('password')}
                    ></input>
                    <div>
                      {pwValidator(signupInfo.password)
                        ? '올바른 비밀번호 형식입니다'
                        : '비밀번호 형식에 맞지 않습니다'}
                    </div>
                  </div>
                  <div>
                    <div>password 확인</div>
                    <input
                      type="password"
                      placeholder="비밀번호를 한번 더 입력하세요"
                      onChange={handleSignupInputValue('passwordConfirm')}
                    ></input>
                    <div>
                      {pwMatchValidator(
                        signupInfo.password,
                        signupInfo.passwordConfirm,
                      )
                        ? '비밀번호가 일치합니다'
                        : '비밀번호가 일치하지 않습니다'}
                    </div>
                  </div>
                  <div>
                    <div>nickname</div>
                    <input
                      placeholder="닉네임을 입력하세요"
                      onChange={handleSignupInputValue('nickname')}
                    ></input>
                    <div>
                      {nicknameValidator(signupInfo.nickname)
                        ? '올바른 닉네임입니다'
                        : '닉네임은 3-20글자 사이여야 합니다'}
                    </div>
                  </div>
                  <div>
                    <div>name</div>
                    <input
                      placeholder="이름을 입력하세요"
                      onChange={handleSignupInputValue('name')}
                    ></input>
                    <div>
                      {nameValidator(signupInfo.name)
                        ? '올바른 이름입니다'
                        : '이름을 입력해주세요'}
                    </div>
                  </div>
                  <div>
                    <div>job</div>
                    <select onChange={handleSignupInputValue('job')}>
                      <option>직업을 선택하세요</option>
                      <option>개발자</option>
                      <option>학생</option>
                    </select>
                    <div>
                      {selectValidator(signupInfo.job)
                        ? '올바른 형식입니다'
                        : '직업을 선택해주세요'}
                    </div>
                  </div>
                  <button onClick={signupHandler}>회원가입</button>
                  <div onClick={modalToggleHandler}>
                    계정이 이미 있으신가요? 로그인
                  </div>
                </section>
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
      <section className="articles">
        <div className="main-errlog-list-title">트렌딩</div>
        <ErrorLog />
      </section>
    </div>
  );
}
