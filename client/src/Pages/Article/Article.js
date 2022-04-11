import { useEffect, useState } from 'react';
import Comment from '../../Components/Comment';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default function Article() {
  const [article, setArticle] = useState({
    id: undefined,
    title: '',
    content: '',
    comments: [],
    createdAt: '',
  });

  // 게시물 상세 정보 불러오기
  const loadArticle = () => {
    axios
      .get('http://15.164.104.171/board/1', {
        headers: { Accept: 'application/json' },
      })
      .then(resp => {
        console.log('console.log(resp.data)', resp.data);
        setArticle({
          id: 1,
          title: resp.data.board[0].title,
          content: resp.data.board[0].content,
          comments: [],
          createdAt: '',
        });
      });
  };

  // 게시물 수정 요청
  const editArticle = () => {
    // 에디터 페이지로 이동 시킨다
  };

  const handleCommentRequest = () => {};

  useEffect(() => {
    loadArticle();
  }, []);

  console.log(article);

  return (
    <section className="article-wrapper">
      <h2>{article.title}</h2>
      <div className="article-info">
        <span>닉네임</span>
        <span>{article.createdAt}</span>
      </div>
      <div className="article-modify-button-wrapper">
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div className="viewer-wraper">
        <Viewer
          initialValue={`# helloWrold  
            ## helloWrold 
            
          `}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      </div>

      <h4>총 댓글 수</h4>
      <section className="write-comments-wrapper">
        <div className="write-comment-wrapper">
          <textarea placeholder="댓글을 작성하세요"></textarea>
          <div>
            <button>댓글 달기</button>
          </div>
        </div>
        <div className="comments-list-wrapper">
          <div className="comments-list">
            {article.comments.length
              ? article.comments.map(comment => (
                  <Comment key={''} comment={''} />
                ))
              : null}
            <Comment />
          </div>
        </div>
      </section>
    </section>
  );
}
