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

import styled from 'styled-components';

const Label = styled.div`
  margin-top: 10px;
  width: 85%;
  height: 2.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:not(.guide) {
    font-size: 0.9rem;
    font-weight: bold;
  }
  > input {
    width: 15rem;
    height: 100%;
    padding: 0rem 0.4rem;
    border: 1px solid #cccccc;
    border-radius: 3px;
    background-color: #cfe2f3;
  }

  > select {
    width: 15rem;
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

axios.defaults.withCredentials = true;

export default function SignupForm({
  modalToggleHandler,
  openLoginModalHandler,
  setMyId,
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
      alert('형식에 맞게 회원정보를 입력해주세요');
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
          setMyId(response.data.id);
          //모달 창 닫기
          openLoginModalHandler();
          modalToggleHandler(true);
        }
      })
      .catch(console.log);
  };
  return (
    <section>
      <h2>회원가입</h2>
      <div className="signupform">
        <Label>
          <div>email</div>
          <input
            placeholder="이메일을 입력하세요"
            onChange={handleSignupInputValue('email')}
          ></input>
        </Label>
        <div className="guide">
          {idValidator(signupInfo.email)
            ? '올바른 이메일 형식입니다'
            : '이메일 형식에 맞지 않습니다'}
        </div>
        <Label>
          <div>password</div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleSignupInputValue('password')}
          ></input>
        </Label>
        <div className="guide">
          {pwValidator(signupInfo.password)
            ? '올바른 비밀번호 형식입니다'
            : '비밀번호 형식에 맞지 않습니다'}
        </div>
        <Label>
          <div>password 확인</div>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            onChange={handleSignupInputValue('passwordConfirm')}
          ></input>
        </Label>
        <div className="guide">
          {pwMatchValidator(signupInfo.password, signupInfo.passwordConfirm)
            ? '비밀번호가 일치합니다'
            : '비밀번호가 일치하지 않습니다'}
        </div>
        <Label>
          <div>nickname</div>
          <input
            placeholder="닉네임을 입력하세요"
            onChange={handleSignupInputValue('nickname')}
          ></input>
        </Label>
        <div className="guide">
          {nicknameValidator(signupInfo.nickname)
            ? '올바른 닉네임입니다'
            : '닉네임은 3-20글자 사이여야 합니다'}
        </div>
        <Label>
          <div>name</div>
          <input
            placeholder="이름을 입력하세요"
            onChange={handleSignupInputValue('name')}
          ></input>
        </Label>
        <div className="guide">
          {nameValidator(signupInfo.name)
            ? '올바른 이름입니다'
            : '이름을 입력해주세요'}
        </div>
        <Label>
          <div>job</div>
          <select onChange={handleSignupInputValue('job')}>
            <option value="직업을 선택하세요">직업을 선택하세요</option>
            <option value="개발자">개발자</option>
            <option value="학생">학생</option>
          </select>
        </Label>
        <div className="guide">
          {selectValidator(signupInfo.job)
            ? '올바른 형식입니다'
            : '직업을 선택해주세요'}
        </div>
        <Button onClick={signupHandler}>회원가입</Button>
        <div className="ismember" onClick={() => modalToggleHandler(true)}>
          계정이 이미 있으신가요? 로그인
        </div>
      </div>
    </section>
  );
}
