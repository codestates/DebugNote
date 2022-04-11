import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  idValidator,
  pwValidator,
  pwMatchValidator,
  nicknameValidator,
  nameValidator,
  selectValidator,
} from '../../Utils/validator';
import styled from 'styled-components';

const Box = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const H3 = styled.h3`
  font-weight: bold;
`;

const Legend = styled.h5`
  font-weight: bold;
`;

const Infobox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
`;

const Input = styled.input`
  margin-top: 0.3rem;
  height: 25px;
  width: 200px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #cfe2f3;
`;

const Select = styled.select`
  height: 25px;
  width: 200px;
`;

const GuideText = styled.div`
  font-size: 0.5rem;
`;

const Btnsection = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  font-weight: bold;
  font-size: 0.7rem;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: #a3cca3;
  width: 4rem;
  height: 2rem;
  margin-left: 1rem;
  &:hover {
    background-color: #82a382;
  }
`;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5NjY1OTk0LCJleHAiOjE2NDk4Mzg3OTR9.yFKxQ5RMJhX7ELh8fdLDCKFoXy_vZt6FcyfVynoivHQ';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

  useEffect(() => {
    //서버로부터 기존에 저장되어 있던 사용자 정보 불러와서, 입력칸에 채워 줄 것.
    axios
      .get('http://15.164.104.171:80/mypage', {
        //헤더
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.user, '사용자 정보');
          //인풋 칸에 사용자 정보 입력한다. 비밀번호는 빼고
          setChangeInfo({ ...changeInfo, ...response.data.user }); //응답 바디?
        }
      })
      .catch(error => {
        console.log(error);
        console.log('회원정보 불러오기 실패');
      });
  }, []);

  const handleUserInputValue = key => e => {
    setChangeInfo({ ...changeInfo, [key]: e.target.value });
  };

  const { email, password, passwordConfirm, nickname, name, job } = changeInfo;
  //수정 처리
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
      //모달 창 띄워주면 더 좋고.
      return;
    }
    axios
      .put(
        'http://15.164.104.171:80/mypage',
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
          //정보 수정 성공: 성공했다고 메세지만 보내줌: 데이터없음
          console.log('수정 성공했습니다');
          //성공했다고 모달 창 띄워주기
        } else {
          //정보 수정 실패
          console.log('수정 실패했습니다');
          //수정에 실패했다고 모달 창 띄워주기
        }
      })
      .catch(() => {
        //수정에 실패했다고 모달 창 띄워주기
        console.log('수정 실패했습니다');
      });
  };
  //탈퇴 처리
  const withdrawalHanlder = () => {
    console.log('회원탈퇴요청');
    //정말로 탈퇴할 건지 물어보는 모달 창 필요
    //조건 묻지 않고 탈퇴 처리
    //파라미터는 테이블의 pk값으로 하여 보낸다! 모든 인증절차 보내는 요청은 pk값을 필요로한다.:추후 논의예정

    axios
      .delete(`http://15.164.104.171:80/auth/`, {
        headers: { accept: 'application/json' },
      })
      .then(response => {
        if (response.status === 204) {
          //탈퇴 잘 됨
          console.log('탈퇴되었습니다');
          //탈퇴 잘 되었다고 모달 창 띄워주기
        } else {
          //탈퇴 실패
          console.log('탈퇴 실패했습니다');
          //탈퇴 실패 모달 창 띄우기
        }
      })
      .catch(() => {
        //탈퇴에 실패했다고 모달 창 띄워주기
        console.log('탈퇴 실패했습니다');
      });
  };

  return (
    <Box>
      <H3>회원정보 수정</H3>
      <Infobox>
        <Legend>이메일</Legend>
        <Input
          placeholder="이메일을 입력하세요"
          onChange={handleUserInputValue('email')}
        ></Input>
        <GuideText>
          {idValidator(changeInfo.email)
            ? '올바른 이메일 형식입니다'
            : '이메일 형식에 맞지 않습니다'}
        </GuideText>
      </Infobox>
      <Infobox>
        <Legend>비밀번호</Legend>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleUserInputValue('password')}
        ></Input>
        <GuideText>
          {pwValidator(changeInfo.password)
            ? '올바른 비밀번호 형식입니다'
            : '비밀번호 형식에 맞지 않습니다'}
        </GuideText>
      </Infobox>
      <Infobox>
        <Legend>비밀번호 확인</Legend>
        <Input
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요"
          onChange={handleUserInputValue('passwordConfirm')}
        ></Input>
        <GuideText>
          {pwMatchValidator(password, passwordConfirm)
            ? '비밀번호가 일치합니다'
            : '비밀번호가 일치하지 않습니다'}
        </GuideText>
      </Infobox>
      <Infobox>
        <Legend>닉네임</Legend>
        <Input
          placeholder="닉네임을 입력하세요"
          onChange={handleUserInputValue('nickname')}
        ></Input>
        <GuideText>
          {nicknameValidator(nickname)
            ? '올바른 닉네임입니다'
            : '닉네임은 3-20글자 사이여야 합니다'}
        </GuideText>
      </Infobox>
      <Infobox>
        <Legend>이름</Legend>
        <Input
          placeholder="이름을 입력하세요"
          onChange={handleUserInputValue('name')}
        ></Input>
        <GuideText>
          {nameValidator(name) ? '올바른 이름입니다' : '이름을 입력해주세요'}
        </GuideText>
      </Infobox>
      <Infobox>
        <Legend>직업</Legend>
        <Select onChange={handleUserInputValue('job')}>
          <option value="직업을 선택하세요">직업을 선택하세요</option>
          <option value="개발자">개발자</option>
          <option value="학생">학생</option>
        </Select>
        <GuideText>
          {selectValidator(job) ? '올바른 형식입니다' : '직업을 선택해주세요'}
        </GuideText>
      </Infobox>
      <Btnsection className="userBtn">
        <Button onClick={infoChangeHandler}>수정</Button>
        <Button onClick={withdrawalHanlder}>회원탈퇴</Button>
      </Btnsection>
    </Box>
  );
}
