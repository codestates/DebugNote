import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

import { useParams, useNavigate } from 'react-router-dom';


import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import Comment from '../../Components/Comment';

const cookies = new Cookies();

axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get(
  'accToken',
)}`;

export default function Article({
  currentArticle,
  setCurrentArticle,
  currentArticleCallback,
  myId,
  isLogin,
}) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  let [bookmarks, setBookmarks] = useState(null);

  const loadArticle = () => {
    axios
      .get(`http://15.164.104.171/boards/${id}`, {
        headers: { Accept: 'application/json' },
      })
      .then(resp => {
        console.log('<Article /> 게시물 상세 조회 응답', resp.data);
        // console.log('댓글 노테이션 맞니', resp.data.comment);

        if (resp.status === 200) {
          console.log('axios');
          const { id, title, content, createdAt, nickname } = resp.data.board;
          const { comment } = resp.data;
          const { BoardId } = resp.data.bookmark;

          if (BoardId == id) {
            setBookmarks(resp.data.bookmark.boardId);
          }

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
  // console.log('뷰어에서 볼 컨텐트 ------>', currentArticle.content);

  //* 삭제 핸들러
  const deleteArticle = () => {
    console.log('삭제 요청');
    axios
      .delete(`http://15.164.104.171/boards/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log('삭제 성공');
          navigate('/');
        } else {
          console.log('삭제 실패');
        }
      })
      .catch(err => console.log(err));
  };

  // 댓글 수정 콜백
  const commentEditCallback = editedComment => {
    // console.log('이거 맞나', editedComment);
    console.log('comments는 뭔데', comments);
    const idx = comments.findIndex(el => el.id === editedComment.id);

    setComments([
      ...comments.slice(0, idx),
      editedComment,
      ...comments.slice(idx + 1),
    ]);
  };

  // 댓글 인풋 상태에 반영
  const handleInputValue = e => {
    setCommentContent(e.target.value);
  };

  // 댓글 제출
  const submitComment = () => {
    console.log('댓글요청');
    axios
      .post(
        `http://15.164.104.171/comments/${id}`,
        { comment: commentContent },
        {
          headers: { Accept: 'application/json' },
        },
      )
      .then(resp => {
        console.log('댓글 요청 완료 후', resp.data);
        // 응답으로 작성한 댓글 정보가 온다
        // textarea 내용을 지운다
        setCommentContent('');
        const { id, comment, createdAt, updatedAt } = resp.data.comment;
        const commentObj = {
          id,
          comment,
          createdAt,
          updatedAt,
          nickname: resp.data.nickname,
        };

        setComments([commentObj, ...comments]);
      })
      .catch(console.log);
  };

  const moveToEdit = () => {
    navigate('/edit');
  };

  //!
  useEffect(() => {
    loadArticle();
  }, []);

  console.log('<Article /> 상세 조회중인 댓글 배열', comments);
  console.log('<Article /> props로 받은 currentArticle 상태: ', currentArticle);

  const addBookmark = () => {
    axios
      .post(`http://15.164.104.171/bookmarks/${id}`)
      .then(response => {
        if (response.status === 203) {
          alert('북마크 추가했습니다');
          setBookmarks(1);
        } else {
          console.log('북마크 추가 실패');
        }
      })
      .catch(err => console.log(err));
  };

  const deleteBookmark = () => {
    axios
      .delete(`http://15.164.104.171/bookmarks/${id}`)
      .then(response => {
        if (response.status === 200) {
          alert('북마크 삭제했습니다');
          setBookmarks(null);
        } else {
          console.log('북마크 취소 실패');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {isLogin === true ? (
        bookmarks === null ? (
          <button onClick={addBookmark}>북마크하기</button>
        ) : (
          <button onClick={deleteBookmark}>북마크취소</button>
        )
      ) : null}
      <section className="article-wrapper">
        <h2>{currentArticle.title}</h2>
        <div className="article-info">
          <span>{currentArticle.nickname}</span>
          <span>{currentArticle.createdAt}</span>
        </div>

        {cookies.get('accToken') ? (
          <div className="article-modify-button-wrapper">
            <div onClick={moveToEdit}>수정</div>
            <button onClick={deleteArticle}>삭제</button>{' '}
          </div>
        ) : null}

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
            <textarea
              onChange={handleInputValue}
              placeholder="댓글을 작성하세요"
              value={commentContent}
            ></textarea>
            <div>
              <button onClick={submitComment}>댓글 달기</button>
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
                      boardId={id}
                      commentContent={commentContent}
                      setComments={setComments}
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
