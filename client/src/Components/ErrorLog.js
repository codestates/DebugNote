import React from 'react';
import { Link } from 'react-router-dom';
//* 게시물 각각 pk 값으로 뿌려줬기 때문에 그 pk로 상세 요청 가능
export default function ErrorLog({ article }) {
  return (
    <article className="errlog">
      <Link to={`${article.id}`}>
        <div className="bookmark-count">북마크 수</div>
        <div>
          <div className="errlog-title-summary">{article.title}</div>
        </div>
      </Link>
    </article>
  );
}
