import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';


import Comment from '../../Components/Comment';

export default function Article({
  currentArticle,
  setCurrentArticle,
  currentArticleCallback,
  myId,
}) {

  let { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const loadArticle = () => {
    axios
      .get(`http://15.164.104.171/boards/${id}`, {
        headers: { Accept: 'application/json' },
      })
      .then(resp => {
        console.log('<Article /> 게시물 상세 조회 응답', resp.data);
        // console.log('댓글 노테이션 맞니', resp.data.comment);

        if (resp.status === 200) {
          const { id, title, content, createdAt, nickname } = resp.data.board;
          const { comment } = resp.data;

          setCurrentArticle({
            id,
            title,
            content,
            createdAt,
            nickname,
          });
          setComments(comment);
        }
      })
      .catch(() => console.log);
  };

  console.log('<Article /> 상세 조회중인 게시물 정보----->', currentArticle);
  console.log('<Article /> 상세 조회중인 댓글 배열 정보----->', comments);
  console.log('뷰어에서 볼 컨텐트 ------>', currentArticle.content);
  //* 삭제 핸들러
  const deleteArticle = () => {
    console.log('삭제 요청');
    axios
      .delete(`http://15.164.104.171/boards/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log('삭제 성공');
        } else {
          console.log('삭제 실패');
        }
      })
      .catch(err => console.log(err));
  };


  const commentEditCallback = editedComment => {
    const idx = comments.findindex(el => el.id === editedComment.id);

    setComments([
      ...comments.slice(0, idx),
      editedComment,
      ...comments.slice(idx + 1),
    ]);
  };


  // 댓글 작성
  const submitComment = () => {
    // axios.
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <div>
      <section className="article-wrapper">
        <h2>{currentArticle.title}</h2>
        <div className="article-info">
          <span>{currentArticle.nickname}</span>
          <span>{currentArticle.createdAt}</span>
        </div>
        <div className="article-modify-button-wrapper">
          <div>
            <Link to="/edit">수정</Link>
          </div>
          <button onClick={deleteArticle}>삭제</button>
        </div>
        <div className="viewer-wraper">
          <Viewer
            initialValue={currentArticle.content}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            height={'600px'}
          />
        </div>

        <h4>{comments.length}</h4>
        <section className="write-comments-wrapper">
          <div className="write-comment-wrapper">
            <textarea placeholder="댓글을 작성하세요"></textarea>
            <div>
              <button onClick={''}>댓글 달기</button>
            </div>
          </div>
          <div className="comments-list-wrapper">
            <div className="comments-list">
              {comments.length
                ? comments.map(comment => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      commentEditCallback={commentEditCallback}
                    />
                  ))
                : null}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
