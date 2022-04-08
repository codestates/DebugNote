import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Searchbar({ setSearchedArticle }) {
  const [searchValue, setSearchValue] = useState('');
  const [option, setOption] = useState('제목');
  const optionChangeHandler = event => {
    setOption(event.target.value);
  };
  const searchHandler = async () => {
    //이제 서버에게 검색 결과를 달라고 요청할 것.
    /*
    로딩 화면 보여줌
    요청에 성공하여 게시물을 받아오는 경우: App.js에서 내려받은 게시글 상태 업데이트. 상태갱신함수 프롭스로 뿌려주기
    요청하였으나 게시글이 하나도 없는 경우 : 검색 결과가 하나도 없습니다 라고 화면에 보여주기
    요청 끝
    로딩 화면 안 보여줌
    */
    // await axios.get(`http://15.164.104.171:80/boards/search?${option==="제목"?titles=searchValue:contents=searchValue&pages=1&start=10}`,{
    //   headers: { Accept: "application/json"}
    // })
    // .then(response =>{
    //   console.log(response.data.board)
    //   setSearchedArticle(response.data.board)
    // })
    //검색창 결과 비우기
    setSearchValue('');
  };
  const searchInputChangeHandler = event => {
    setSearchValue(event.target.value);
  };
  return (
    <section className="search">
      <select onChange={optionChangeHandler}>
        <option value="제목">제목</option>
        <option value="내용">내용</option>
      </select>
      <div>
        <input
          type="text"
          value={searchValue}
          placeholder="검색어를 입력해주세요"
          onChange={searchInputChangeHandler}
          onKeyUp={event =>
            event.key === 'Enter' ? searchHandler(event) : null
          }
        ></input>
        <div onClick={() => searchHandler(searchValue)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </section>
  );
}
