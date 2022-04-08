import React from 'react';

export default function ErrorLog({ article }) {
  return (
    <article key="" className="errlog">
      <div className="bookmark-count">북마크 수</div>
      <div>
        <div className="errlog-title-summary">{article.title}</div>
        <div className="errlog-content-summary">{article.content}</div>
      </div>
    </article>
  );
}
