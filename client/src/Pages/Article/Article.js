import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Comment from '../../Components/Comment';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default function Article({ currentArticle, setCurrentArticle }) {
  let { id } = useParams();
  //! 전역에서 링하고 {...} 객체 복사 해서 상태 업데이트 해야할 듯 하다
  const [comments, setComments] = useState([]);
  // setcurrentArticle({id: 2, nickname: 'a', title: 'java', content: 'react is easy', picture: 'http://abc.com/1.png', …}
  // length: 2
  // ,Comments
  // [1,,3,4,5,6]
  // [[Prototype]]: Array(0)
  // )
  // setcomment(currentArticle.Comments)
  // 게시물 상세 정보 불러오기
  const loadArticle = () => {
    console.log('로드했니');
    axios
      .get(`http://15.164.104.171/board/${id}`, {
        headers: { Accept: 'application/json' },
      })
      .then(resp => {
        console.log('게시물 상세 조회 응답', resp.data);
        // ! 응답으로 게시물 작성자의 닉네임 필요 -> 요청했음
        const { id, title, content, createdAt, nickname, comment } =
          resp.data.board;

        setCurrentArticle({
          id,
          title,
          content,
          createdAt,
          nickname,
        });
        //! 응답 '댓글 객체' 키 'C' 대문자인지 확인 -> C 대문자 맞음
        setComments(comment);
      })
      .catch(() => {
        console.log('캐치했니');
        setCurrentArticle();
      });
  };

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

  console.log('----->', currentArticle);

  const commentEditCallback = editedComment => {
    const idx = comments.findindex(el => el.id === editedComment.id);

    setComments([
      ...comments.slice(0, idx),
      editedComment,
      ...comments.slice(idx + 1),
    ]);
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <section className="article-wrapper">
      <h2>제목</h2>
      <div className="article-info">
        <span>닉네임</span>
        <span>작성일</span>
      </div>
      <div className="article-modify-button-wrapper">
        <div>
          <Link to="edit">수정</Link>
        </div>
        <button onClick={deleteArticle}>삭제</button>
      </div>
      <div className="viewer-wraper">
        <Viewer
          initialValue={'# helloWorld'}
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
            {comments.length
              ? comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    setComments={setComments}
                  />
                ))
              : null}
            <Comment />
          </div>
        </div>
      </section>
    </section>
  );
}
