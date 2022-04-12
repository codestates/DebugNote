import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SearchSection = styled.div`
  border: 1px solid pink;
  display: flex;
  justify-content: center;
  align-items: center;
  > select {
    width: 6rem;
    height: 2rem;
    padding: 0.4rem;
  }
  > .input-icon-wrapper {
    margin-left: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    width: 50%;
    height: 2.7rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &:focus {
      border: 1px solid #a3cca3;
    }
    > input {
      border: none;
      width: 85%;
      height: 85%;
      margin-right: 1rem;
      &:focus {
        outline: none;
      }
    }
    > div {
      font-size: 1.5rem;
      color: #a3cca3;
    }
  }
`;

export default function Searchbar({
  setCurrentArticle,
  pageQuery,
  setTotalArticles,
}) {
  //검색 옵션 상태 관리
  const [option, setOption] = useState('제목');
  const optionChangeHandler = event => {
    setOption(event.target.value);
  };
  //검색창 인풋 내용 관리
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchInputChangeHandler = event => {
    setSearchKeyword(event.target.value);
  };

  const searchHandler = (searchOption, searchKeyword) => {
    console.log(searchOption, searchKeyword, '검색 조건');
    console.log('검색함수 실행한다.');
    if (searchKeyword === '') return;
    let endpoint;
    if (searchOption === '제목') {
      endpoint = `http://15.164.104.171:80/search?titles=${searchKeyword}&search_type=titles`;
    } else {
      endpoint = `http://15.164.104.171:80/search?contents=${searchKeyword}&search_type=contents`;
    }

    //검색창 비우기
    setSearchKeyword('');

    //엔드포인트 주소를 설정했으면, 이제 서버에 요청을 보내자.
    axios
      .get(endpoint, {
        headers: { Accept: 'application/json' },
      })
      .then(response => {
        if (response.status === 201) {
          //서버에 요청 보내기 성공하여 데이터를 잘 받아옴.
          setCurrentArticle(response.data.findBoard);
        } else {
          //서버에 요청 보내기 실패하였음. 검색결과 없다고 할것
          console.log('검색결과없음');
          setCurrentArticle([]);
        }
      })
      .catch(error => {
        //검색결과없음
        console.log(error, '에러 내용');
        setCurrentArticle([]);
      });
  };

  const searchClickHandler = () => {
    searchHandler(option, searchKeyword);
  };

  //검색창에 글자 입력 후 엔터를 치면 검색 함수 실행
  const KeyPressHandler = event => {
    if (event.type === 'keypress' && event.code === 'Enter') {
      console.log('검색함수실행');
      searchClickHandler();
    }
  };

  return (
    <SearchSection>
      <select onChange={optionChangeHandler}>
        <option value="제목">제목</option>
        <option value="내용">내용</option>
      </select>
      <div className="input-icon-wrapper">
        <input
          placehoder="검색어를 입력하세요"
          type="text"
          value={searchKeyword}
          onChange={searchInputChangeHandler}
          onKeyPress={KeyPressHandler}
        ></input>
        <div onClick={searchClickHandler}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </SearchSection>
  );
}
