import './Main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from '../Components/Searchbar';
import LoadingIndicator from '../Components/LoadingIndicator';
import FailIndicator from '../Components/FailIndicator';
import ErrorLog from '../Components/ErrorLog';
//* practice
import Pagination from '../Components/Pagination';

export default function Main({
  isLogin,
  setIsLogin,
  logoutHandler,
  isOpen,
  isMember,
  openLoginModalHandler,
  modalToggleHandler,
  loadedArticles,
  setLoadedArticles,
}) {
  const [isLoading, setIsLoading] = useState(true);

  //* 페이지네이션
  //* 현재 클릭한 페이지, 서버로 부터 받은 총 게시글 수 상태값
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const paginationHandler = currentPage => {
    axios
      .get(`http://15.164.104.171/?pages=${currentPage}&limit=10`, {
        ///?page={페이지넘버}&limit=10
        // 페이지, 페이지 시작번호는  상태로 관리 필요. 최신순으로 화면에 구현
        headers: { Accept: 'application/json' },
      })
      .then(response => {
        console.log('메인페이지 게시물 로딩 응답-->', response);
        if (response.status === 200) {
          console.log('응답 토탈카운트', response.data.boards.count);
          setLoadedArticles(response.data.boards.rows);
          setTotalArticles(response.data.boards.count);
          setIsLoading(false); //로딩 종료
        } else {
          console.log('게시물부르기실패');
          setIsLoading(false); //일단 로딩화면 종료
          //전체 게시물 불러오기 실패
        }
      })
      .catch(() => setIsLoading(false));
  };

  //검색창 하단 기본 게시물 노출을 위한 useEffect 호출:
  useEffect(() => {
    console.log('useEffect 실행');
    setIsLoading(true);
    paginationHandler(currentPage);
  }, [currentPage]);

  return (
    <div className="main-content">
      <Searchbar
        setLoadedArticles={setLoadedArticles}
        setTotalArticles={setTotalArticles}
        currentPage={currentPage}
      />
      <section className="articles">
        <div className="main-errlog-list-title">최신순</div>
        {/*useEffect을 통해 전체 게시글을 보여줄 부분*/}
        {isLoading ? (
          <LoadingIndicator />
        ) : loadedArticles.length !== 0 ? (
          loadedArticles.map(article => (
            <ErrorLog key={article.id} article={article} />
          ))
        ) : (
          <FailIndicator />
        )}
        <Pagination
          totalArticles={totalArticles}
          setCurrentPage={setCurrentPage}
        ></Pagination>
      </section>
    </div>
  );
}
