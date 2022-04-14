import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Article = styled.article`
  border: 1px solid #cdcfcd;
  border-radius: 3px;
  padding: 0.4rem 1rem;
  margin: 10px 0;
  width: 96%;
  height: 60px;
  > a {
    color: black;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &:hover {
    box-shadow: 2px 2px 2px #cdd6cd;
  }
`;

const Bookmark = styled.div`
  height: 100%;
  flex: 1;
`;

const Icon = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    color: #a3cca3;
    font-size: 1rem;
  }
  > .bookmark-count {
    font-size: 0.5rem;
  }
`;

const Title = styled.div`
  margin-left: 5px;
  width: 500px;
  flex: 18;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
`;

//* 게시물 각각 pk 값으로 뿌려줬기 때문에 그 pk로 상세 요청 가능
export default function ErrorLog({ article }) {
  console.log(article, '게시글');
  return (
    <Article className="errlog">
      <Link to={`/${article.id}`}>
        <Icon>
          <div>
            <i className="fa-solid fa-bookmark"></i>
          </div>
          {/* <Bookmark className="bookmark-count">북마크 수</Bookmark> */}
        </Icon>
        <Title>{article.title}</Title>
      </Link>
    </Article>
  );
}
