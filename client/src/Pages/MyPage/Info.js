import { useState } from 'react';
import axios from 'axios';
import {
  idValidator,
  pwValidator,
  pwMatchValidator,
  nicknameValidator,
  nameValidator,
  selectValidator,
} from '../../Utils/validator';

axios.defaults.withCredentials = false;
export default function Info() {
  const [changeInfo, setChangeInfo] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    name: '',
    job: '직업을 선택하세요',
  });

  const handleSignupInputValue = key => e => {
    setChangeInfo({ ...changeInfo, [key]: e.target.value });
  };

  const { email, password, passwordConfirm, nickname, name, job } = changeInfo;

  const infoChangeHandler = () => {
    console.log('회원정보 수정요청');
    //사용자 입력값이 하나라도 비어 있으면 리턴할 것.
    if (
      email === '' ||
      password === '' ||
      passwordConfirm === '' ||
      nickname === '' ||
      name === '' ||
      job === ''
    ) {
      return;
    }
    axios
      .put(
        'http://15.164.104.171:80/users',
        {
          email,
          nickname,
          name,
          job,
          password,
        },
        {
          headers: {
            accept: 'application/json',
          },
        },
      )
      .then(response => {
        if (response.status === 200) {
          //정보 수정 성공
          //성공했다고 모달 창 띄워주기
        } else {
          //정보 수정 실패
          //수정에 실패했다고 모달 창 띄워주기
        }
      })
      .catch(() => {
        //수정에 실패했다고 모달 창 띄워주기
      });
  };
  //탈퇴 처리
  const withdrawalHanlder = () => {
    console.log('회원탈퇴요청');
    //정말로 탈퇴할 건지 물어보는 모달 창 필요
    //조건 묻지 않고 탈퇴 처리
    axios
      .delete('http://15.164.104.171:80/auth/dropout', {
        headers: { accept: 'application/json' },
      })
      .then(response => {
        if (response.status === 204) {
          //탈퇴 잘 됨
          //탈퇴 잘 되었다고 모달 창 띄워주기
        } else {
          //탈퇴 실패
          //탈퇴 실패 모달 창 띄우기
        }
      })
      .catch(() => {
        //탈퇴에 실패했다고 모달 창 띄워주기
      });
  };

  return (
    <>
      <header>회원정보 수정</header>
      <div>
        <div>email</div>
        <input
          placeholder="이메일을 입력하세요"
          onChange={handleSignupInputValue('email')}
        ></input>
        <div>
          {idValidator(changeInfo.email)
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
          {pwValidator(changeInfo.password)
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
          {pwMatchValidator(password, passwordConfirm)
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
          {nicknameValidator(nickname)
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
          {nameValidator(name) ? '올바른 이름입니다' : '이름을 입력해주세요'}
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
          {selectValidator(job) ? '올바른 형식입니다' : '직업을 선택해주세요'}
        </div>
      </div>
      <section className="userBtn">
        <button onClick={infoChangeHandler}>수정</button>
        <button onClick={withdrawalHanlder}>회원탈퇴</button>
      </section>
    </>
  );
}
