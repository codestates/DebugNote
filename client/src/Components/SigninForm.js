import { useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

axios.defaults.withCredentials = true;

export default function SigninForm({
  modalToggleHandler,
  openLoginModalHandler,
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
          //withCredentials: 'true', 이거해도 안됨
        },
      )
      .then(response => {
        if (response.status === 201) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.accToken}`;
          //쿠키저장코드: withCredentials: 'include', 서버측 오리진은 3000포트로 설정해두고 쿠키 저장 성공 시 아래 코드 불필요
          // cookies.set('accToken', response.data.accToken, { maxAge: '6h' });
          // 인증으로 받은 쿠키로 화면 권한 설정을 위해 리액트 쿠키모듈 썼습니다.
          //브라우저 자체적으로 저장되는 거라 유효기간도 다시 설정했어요ㅠㅠ
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
