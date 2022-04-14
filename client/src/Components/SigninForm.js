import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Label = styled.div`
  width: 85%;
  height: 2.5rem;
  margin: 1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    font-weight: bold;
  }
  > input {
    width: 60%;
    height: 100%;
    padding: 0rem 0.4rem;
    border: 1px solid #cccccc;
    border-radius: 3px;
    background-color: #cfe2f3;
  }
`;

const Button = styled.button`
  width: 85%;
  height: 2.5rem;
  border: none;
  margin: 1rem;
  border-radius: 3px;
  background-color: #a3cca3;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
    background-color: #82a382;
  }
`;

// axios.defaults.withCredentials = true;

export default function SigninForm({
  modalToggleHandler,
  openLoginModalHandler,
  isLogin, //충돌
  setIsLogin, //충돌
  setMyId,
  myId,
}) {
  const [signinInfo, setSigninInfo] = useState({
    email: '',
    password: '',
  });

  const handleSigninInputValue = key => e => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });
  };

  const loginHandler = () => {
    if (signinInfo.email === '' || signinInfo.password === '') {
      alert('로그인 정보를 다시 확인해 주세요');
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
        console.log('$$$$$$$로그인 응답--->', response.data.id);
        if (response.status === 201) {
          //이후의 모든 요청에 이 헤더 적용된다.
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.accToken}`;

          setIsLogin(!isLogin);
          setMyId(`${response.data.id}`);
          //모달 창 닫기
          openLoginModalHandler();
        }
      })
      .catch(() => alert('로그인 정보를 다시 확인해 주세요'));
  };

  return (
    <section>
      <div className="signupform">
        <h2>Login</h2>
        <Label>
          <div>Email</div>
          <input
            placeholder="이메일을 입력하세요"
            onChange={handleSigninInputValue('email')}
          ></input>
        </Label>
        <Label>
          <div>Password</div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleSigninInputValue('password')}
          ></input>
        </Label>
        <Button onClick={loginHandler}>로그인</Button>
        {/* <Button>소셜 계정으로 로그인</Button> */}
        <div className="ismember" onClick={() => modalToggleHandler(false)}>
          아직 회원이 아니신가요? 회원가입
        </div>
        {/* <button>github</button> */}
      </div>
    </section>
  );
}
