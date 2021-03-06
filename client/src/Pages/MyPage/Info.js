import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  justify-content: space-between;
  width: 500px;
  /* padding: 0 0.4rem; */
  margin-bottom: 0.4rem;
  > div {
    width: 48%;
  }
`;

const Legend = styled.h5`
  font-weight: bold;
`;

const Infobox = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  /* margin-left: 0.5rem; */
  height: 35px;
  width: 100%;
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
  margin-bottom: 0.7rem;
  &:hover {
    background-color: #82a382;
  }
`;

axios.defaults.withCredentials = false;

export default function Info({ setIsLogin, myId, setMyId }) {
  const [changeInfo, setChangeInfo] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    name: '',
    job: '????????? ???????????????',
  });

  useEffect(() => {
    console.log('????????? ?????? ?????????!');
    //??????????????? ????????? ???????????? ?????? ????????? ?????? ????????????, ???????????? ?????? ??? ???.
    //http://15.164.104.171:80/mypage
    axios
      .get('http://15.164.104.171:80/users', {
        //??????
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.user, '????????? ??????');
          //?????? ?????? ????????? ?????? ????????????. ??????????????? ??????
          setChangeInfo({ ...changeInfo, ...response.data.user }); //?????? ???????
        }
      })
      .catch(error => {
        console.log(error);
        alert('??????????????? ???????????? ???????????????');
      });
  }, []);

  const handleUserInputValue = key => e => {
    setChangeInfo({ ...changeInfo, [key]: e.target.value });
  };

  const { email, password, passwordConfirm, nickname, name, job } = changeInfo;
  //?????? ??????
  const infoChangeHandler = () => {
    console.log('???????????? ????????????');
    //????????? ???????????? ???????????? ?????? ????????? ????????? ???.
    if (
      email === '' ||
      password === '' ||
      passwordConfirm === '' ||
      nickname === '' ||
      name === '' ||
      job === ''
    ) {
      //?????? ??? ???????????? ??? ??????.
      alert('???????????? ?????? ?????????????????????. ???????????? ????????? ?????? ??????????????????.');
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
          //?????? ?????? ??????: ??????????????? ???????????? ?????????: ???????????????
          alert('???????????? ?????? ??????????????????.');
          //??????????????? ?????? ??? ????????????
        } else {
          //?????? ?????? ??????
          alert('???????????? ?????? ??????????????????.');
          //????????? ??????????????? ?????? ??? ????????????
        }
      })
      .catch(() => {
        //????????? ??????????????? ?????? ??? ????????????
        console.log('?????? ??????????????????');
      });
  };

  console.log(myId, '???????????? ??? ???????????? pk???: ???????????? ???');
  //?????? ??????
  const withdrawalHanlder = () => {
    console.log('??????????????????');
    //????????? ????????? ?????? ???????????? ?????? ??? ??????
    //?????? ?????? ?????? ?????? ??????
    //??????????????? ???????????? pk????????? ?????? ?????????! ?????? ???????????? ????????? ????????? pk?????? ???????????????.:?????? ????????????
    const userId = myId;
    console.log(myId, '???????????? ??? ???????????? pk???');
    axios
      .delete(`http://15.164.104.171:80/auth/${userId}`, {
        headers: { accept: 'application/json' },
      })
      .then(response => {
        if (response.status === 204) {
          //?????? ??? ???
          setMyId('');
          setIsLogin(false);
          axios.defaults.headers.common['Authorization'] = '';
          alert('?????????????????????');
          //?????? ??? ???????????? ?????? ??? ????????????
          //????????????
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <Box>
      <h2>????????????</h2>
      <InfoSection>
        <Important>
          <Infobox>
            <Legend>?????????</Legend>
            <Input
              value={email}
              placeholder="???????????? ???????????????"
              onChange={handleUserInputValue('email')}
            ></Input>
            <GuideText>
              {idValidator(changeInfo.email)
                ? '????????? ????????? ???????????????'
                : '????????? ????????? ?????? ????????????'}
            </GuideText>
          </Infobox>
          <Infobox>
            <Legend>????????????</Legend>
            <Input
              type="password"
              placeholder="??????????????? ???????????????"
              onChange={handleUserInputValue('password')}
            ></Input>
            <GuideText>
              {pwValidator(changeInfo.password)
                ? '????????? ???????????? ???????????????'
                : '???????????? ????????? ?????? ????????????'}
            </GuideText>
          </Infobox>
          <Infobox>
            <Legend>???????????? ??????</Legend>
            <Input
              type="password"
              placeholder="??????????????? ?????? ??? ???????????????"
              onChange={handleUserInputValue('passwordConfirm')}
            ></Input>
            <GuideText>
              {pwMatchValidator(password, passwordConfirm)
                ? '??????????????? ???????????????'
                : '??????????????? ???????????? ????????????'}
            </GuideText>
          </Infobox>
          <Infobox>
            <Legend>??????</Legend>
            <Select onChange={handleUserInputValue('job')} value={job}>
              <option value="????????? ???????????????">????????? ???????????????</option>
              <option value="?????????">?????????</option>
              <option value="??????">??????</option>
            </Select>
            <GuideText>
              {selectValidator(job)
                ? '????????? ???????????????'
                : '????????? ??????????????????'}
            </GuideText>
          </Infobox>
        </Important>
        <Namebox>
          <Infobox>
            <Legend>?????????</Legend>
            <Name
              value={nickname}
              placeholder="???????????? ???????????????"
              onChange={handleUserInputValue('nickname')}
            ></Name>
            <GuideText>
              {nicknameValidator(nickname)
                ? '????????? ??????????????????'
                : '???????????? 3-20?????? ???????????? ?????????'}
            </GuideText>
          </Infobox>
          <Infobox>
            <Legend>??????</Legend>
            <Name
              value={name}
              placeholder="????????? ???????????????"
              onChange={handleUserInputValue('name')}
            ></Name>
            <GuideText>
              {nameValidator(name)
                ? '????????? ???????????????'
                : '????????? ??????????????????'}
            </GuideText>
          </Infobox>
        </Namebox>
      </InfoSection>
      <Btnsection className="userBtn">
        <Button onClick={infoChangeHandler}>??????</Button>
        <Link to="/">
          <Button onClick={withdrawalHanlder}>????????????</Button>
        </Link>
      </Btnsection>
    </Box>
  );
}
