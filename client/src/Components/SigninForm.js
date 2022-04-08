import { useState } from 'react';
import axios from 'axios';

export default function SigninForm({
  modalToggleHandler,
  openLoginModalHandler,
  isLogin,
  setIsLogin,
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
        if (response.status === 201) {
          //console.log(response.data.accToken, '응답');
          setIsLogin(!isLogin);
          //모달 창 닫기
          openLoginModalHandler();
        }
      })
      .catch(console.log);
  };

  return (
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
      <div onClick={modalToggleHandler}>아직 회원이 아니신가요? 회원가입</div>
      <div>소셜 계정으로 로그인</div>
      <button>github</button>
    </section>
  );
}
