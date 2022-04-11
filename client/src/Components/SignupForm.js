import { useState } from 'react';
import axios from 'axios';
import {
  idValidator,
  pwValidator,
  pwMatchValidator,
  nicknameValidator,
  nameValidator,
  selectValidator,
} from '../Utils/validator';

axios.defaults.withCredentials = false;

export default function SignupForm({
  modalToggleHandler,
  openLoginModalHandler,
}) {
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    name: '',
    job: '직업을 선택하세요',
  });

  const handleSignupInputValue = key => e => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const signupHandler = () => {
    //입력값 에러 처리
    console.log('ok');
    const { email, password, nickname, name, job } = signupInfo;
    //회원가입
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

    axios
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
          //모달 창 닫기
          openLoginModalHandler();
        }
      })
      .catch(console.log);
  };
  return (
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
          {pwMatchValidator(signupInfo.password, signupInfo.passwordConfirm)
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
          <option value="직업을 선택하세요">직업을 선택하세요</option>
          <option value="개발자">개발자</option>
          <option value="학생">학생</option>
        </select>
        <div>
          {selectValidator(signupInfo.job)
            ? '올바른 형식입니다'
            : '직업을 선택해주세요'}
        </div>
      </div>
      <button onClick={signupHandler}>회원가입</button>
      <div onClick={modalToggleHandler}>계정이 이미 있으신가요? 로그인</div>
    </section>
  );
}
