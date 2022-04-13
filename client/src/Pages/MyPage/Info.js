import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  > h2 {
    /* border: 1px solid orange; */
    width: 96%;
  }
`;

const InfoSection = styled.section`
  /* border: 1px solid blue; */
  width: 96%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

const Important = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Namebox = styled.section`
  display: flex;
  justify-content: space-around;
  width: 45%;
  padding: 0 0.4rem;
`;

const Legend = styled.h5`
  font-weight: bold;
`;

const Infobox = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
`;

const Input = styled.input`
  margin-top: 0.3rem;
  height: 35px;
  width: 500px;
  padding: 0rem 0.4rem;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #cfe2f3;
`;

const Name = styled.input`
  margin-top: 0.3rem;
  height: 35px;
  width: 240px;
  padding: 0rem 0.4rem;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #cfe2f3;
`;

const Select = styled.select`
  margin-top: 0.3rem;
  height: 35px;
  width: 500px;
  padding: 0rem 0.4rem;
`;

const GuideText = styled.div`
  font-size: 0.5rem;
`;

const Btnsection = styled.section`
  width: 96%;
  height: 18%;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  font-weight: bold;
  font-size: 0.7rem;
  border: none;
  border-radius: 3px;
  color: white;
  text-align: center;
  background-color: #a3cca3;
  width: 32rem;
  height: 2rem;
  margin-bottom: 0.6rem;
  &:hover {
    background-color: #82a382;
  }
`;

axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get(
  'accToken',
)}`;

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
    console.log('사용자 정보 불러와!');
    //서버로부터 기존에 저장되어 있던 사용자 정보 불러와서, 입력칸에 채워 줄 것.
    //http://15.164.104.171:80/mypage
    axios
      .get('http://15.164.104.171:80/users', {
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
      .delete(`http://15.164.104.171:80/users`, {
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

  return cookies.get('accToken') ? (
    <Box>
      <h2>회원정보</h2>
      <InfoSection>
        <Important>
          <Infobox>
            <Legend>이메일</Legend>
            <Input
              value={email}
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
            <Legend>직업</Legend>
            <Select onChange={handleUserInputValue('job')} value={job}>
              <option value="직업을 선택하세요">직업을 선택하세요</option>
              <option value="개발자">개발자</option>
              <option value="학생">학생</option>
            </Select>
            <GuideText>
              {selectValidator(job)
                ? '올바른 형식입니다'
                : '직업을 선택해주세요'}
            </GuideText>
          </Infobox>
        </Important>
        <Namebox>
          <Infobox>
            <Legend>닉네임</Legend>
            <Name
              value={nickname}
              placeholder="닉네임을 입력하세요"
              onChange={handleUserInputValue('nickname')}
            ></Name>
            <GuideText>
              {nicknameValidator(nickname)
                ? '올바른 닉네임입니다'
                : '닉네임은 3-20글자 사이여야 합니다'}
            </GuideText>
          </Infobox>
          <Infobox>
            <Legend>이름</Legend>
            <Name
              value={name}
              placeholder="이름을 입력하세요"
              onChange={handleUserInputValue('name')}
            ></Name>
            <GuideText>
              {nameValidator(name)
                ? '올바른 이름입니다'
                : '이름을 입력해주세요'}
            </GuideText>
          </Infobox>
        </Namebox>
      </InfoSection>
      <Btnsection className="userBtn">
        <Button onClick={infoChangeHandler}>수정</Button>
        <Button onClick={withdrawalHanlder}>회원탈퇴</Button>
      </Btnsection>
    </Box>
  ) : (
    <Navigate to="/" />
  );
}
