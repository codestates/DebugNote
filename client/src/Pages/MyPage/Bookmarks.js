import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LoadingIndicator from '../../Components/LoadingIndicator';
import ErrorLog from '../../Components/ErrorLog';
import Pagination from '../../Components/Pagination';
import FailIndicator from '../../Components/FailIndicator';
import Article from '../Article/Article';
export default function Logs() {
  const [isLoading, setIsLoading] = useState(true);
  //* 페이지네이션
  //* 현재 클릭한 페이지, 서버로 부터 받은 총 게시글 수 상태값
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentArticle, setCurrentArticle] = useState([]);
  const paginationHandler = currentPage => {
    //* start, limit : 게시물 시작 번호와 끝 번호. (1페이지 이상, 10페이지 이하)
    //const [S, L] = [currentPage * 10 - 9, currentPage * 10];

    axios
      .get(`http://15.164.104.171/?page=1&limit=10`, {
        ///?page={페이지넘버}&limit=10
        // 페이지, 페이지 시작번호는  상태로 관리 필요. 최신순으로 화면에 구현
        headers: { Accept: 'application/json' },
      })
      .then(response => {
        console.log('axios 요청 횟수', response.data.boards);
        if (response.status === 200) {
          setCurrentArticle(response.data.boards);
          //! 추후 서버에서 받은 총 게시물 수로 대체
          setTotalArticles(15);
          setIsLoading(false); //로딩 종료
        } else {
          console.log('게시물부르기실패');
          setIsLoading(false); //일단 로딩화면 종료
          //전체 게시물 불러오기 실패
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        setCurrentArticle([
          { id: 1, title: '제목', content: '첫번째 북마크 내용' },
          { id: 2, title: '제목22', content: '두번째 북마크 내용' },
        ]);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    paginationHandler(currentPage);
  }, [currentPage]);
  return (
    <div className="bookmarks">
      <header>내가 북마크한 에러 로그</header>
      <Routes>
        <Route
          path="/:id"
          element={<Article currentArticle={currentArticle} />}
        />
        <Route
          path="/"
          element={
            <section>
              {isLoading ? (
                <LoadingIndicator />
              ) : currentArticle.length !== 0 ? (
                currentArticle.map(article => (
                  <ErrorLog key={article.id} article={article} />
                ))
              ) : (
                <FailIndicator />
              )}
              <Pagination
                totalArticles={totalArticles}
                paginate={setCurrentPage}
              ></Pagination>
            </section>
          }
        />
      </Routes>
    </div>
  );
}

{
  /*여기서도 페이지네이션이 필요하다*/
}
