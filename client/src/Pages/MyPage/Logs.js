import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoadingIndicator from '../../Components/LoadingIndicator';
import ErrorLog from '../../Components/ErrorLog';
import Pagination from '../../Components/Pagination';
import FailIndicator from '../../Components/FailIndicator';
// import Article from '../Article/Article';
import styled from 'styled-components';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get(
  'accToken',
)}`;

const Box = styled.div`
  padding: 0 0.5rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  > h2 {
    padding: 0 0.3rem;
    margin-bottom: 15px;
    width: 97%;
    text-align: start;
  }
`;

export default function Logs() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentArticle, setCurrentArticle] = useState([]);

  const paginationHandler = currentPage => {
    // 서버에 데이터를 받아서 데이터 처리
    axios
      .get(`http://15.164.104.171/users/boards?pages=${currentPage}&limit=10`, {
        headers: { Accept: 'application/json' },
      })
      .then(response => {
        console.log('axios 요청', response.data.board);
        if (response.status === 200) {
          // console.log(response.data.board.count);
          setCurrentArticle(response.data.board.rows);
          setTotalArticles(response.data.board.count);
        } else {
          console.log('게시물부르기실패');
        }
      })
      .catch(error => {
        console.log('게시글 못받음');
      });
  };
  useEffect(() => {
    setIsLoading(true);
    paginationHandler(currentPage);
    setIsLoading(false);
  }, [currentPage]);

  return cookies.get('accToken') ? (
    <Box className="logs">
      <Routes>
        {/* <Route path="/:id" element={<Article />} /> 전체 게시글 프롭스뺌 */}
        <Route
          path="/*"
          element={
            <Section>
              <h2>My Error Logs</h2>
              {isLoading ? (
                <LoadingIndicator />
              ) : currentArticle.length ? (
                currentArticle.map(article => (
                  <ErrorLog key={article.id} article={article} />
                ))
              ) : (
                <FailIndicator />
              )}
              <Pagination
                totalArticles={totalArticles}
                setCurrentPage={setCurrentPage}
              ></Pagination>
            </Section>
          }
        />
      </Routes>
    </Box>
  ) : (
    <Navigate to="/" />
  );
}
