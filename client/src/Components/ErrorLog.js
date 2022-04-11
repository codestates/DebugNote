import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorLog(props) {
  return (
    <article className="errlog">
      <Link to={`${props.article.id}`}>
        <div className="bookmark-count">북마크 수</div>
        <div>
          <div className="errlog-title-summary">{props.article.title}</div>
        </div>
      </Link>
    </article>
  );
}
