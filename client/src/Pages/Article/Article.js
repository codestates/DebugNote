import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Comment from '../../Components/Comment';

import styled from 'styled-components';

const Box = styled.div`
  padding: 2rem 10rem;
`;
const ArticleDetail = styled.section`
  /* border: 1px solid red; */
  > header {
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > .name-timestamp {
      /* border:1px solid red; */
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > .timestamp {
        font-size: 0.8rem;
      }
    }
    > button {
      border: none;
      background-color: #ffffff;
      font-weight: bold;
    }
  }
  > h2 {
    border-bottom: 1px solid #e0e0e0;
    padding: 1rem 0;
  }
  > .article-modify-button-wrapper {
    display: flex;
    justify-content: flex-end;
    > button {
      border: none;
      background-color: #ffffff;
      margin-left: 0.4rem;
      padding: 0.4rem;
      font-weight: bold;
    }
  }
  /* >.viewer-wrapper{
    border: 1px solid orange;
  } */

  > h4 {
    margin: 1rem 0rem;
  }

  > .write-comments-wrapper {
    margin-top: 2rem;
    > .write-comment-wrapper {
      padding: 1rem 0rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      > textarea {
        width: 100%;
        height: 5rem;
        margin-bottom: 1rem;
        resize: none;
        font-size: 1.2rem;
        &:focus {
          outline: none;
        }
      }
      > button {
        height: 100%;
        margin-left: 0.5rem;
        border: none;
        background-color: #000000;
        padding: 0.4rem 1rem;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
`;

export default function Article({
  currentArticle,
  setCurrentArticle,
  myId,
  isLogin,
}) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  let [bookmarks, setBookmarks] = useState(null);

  const loadArticle = () => {
    console.log('게시물 불러온다.');
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
          console.log('1');
          const { comment } = resp.data;
          console.log('2');
          const { Bookmark } = resp.data;
          console.log('3');
          console.log(Bookmark);

          if (Bookmark !== undefined) {
            console.log('ㅎㅎ');
            setBookmarks(Bookmark.BoardId);
          }
          console.log('51번째');
          setCurrentArticle({
            id,
            title,
            content,
            createdAt,
            nickname,
          });
          setComments(comment);
          console.log('axios 요청 후 게시글', currentArticle);
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
          alert('정상적으로 삭제되었습니다');
          navigate('/');
        } else {
          console.log('삭제 실패');
          alert('다른 사람의 게시글은 삭제 불가합니다');
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
        alert('정상적으로 등록되었습니다');
      })
      .catch(() => alert('다른 사람의 댓글은 수정 불가합니다'));
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
          alert('북마크 추가 실패했습니다');
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
          alert('북마크를 취소하지 못했습니다');
        }
      })
      .catch(err => console.log(err));
  };
  const parsedDate = new Date(currentArticle.createdAt).toLocaleDateString(
    'ko-kr',
  );
  return (
    <Box>
      <ArticleDetail className="article-wrapper">
        <header>
          <div class="name-timestamp">
            <div>{currentArticle.nickname}</div>
            <div className="timestamp">{parsedDate}</div>
          </div>
          {isLogin === true ? (
            bookmarks === null ? (
              <button onClick={addBookmark}>북마크하기</button>
            ) : (
              <button onClick={deleteBookmark}>북마크취소</button>
            )
          ) : null}
        </header>
        <h2>{currentArticle.title}</h2>
        {isLogin ? (
          <div className="article-modify-button-wrapper">
            <button onClick={moveToEdit}>수정</button>
            <button onClick={deleteArticle}>삭제</button>{' '}
          </div>
        ) : null}

        <div className="viewer-wrapper">
          <Viewer
            initialValue={currentArticle.content}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            height={'600px'}
          />
        </div>
        <section className="write-comments-wrapper">
          <h4>댓글 {comments.length}</h4>
          <div className="write-comment-wrapper">
            {isLogin ? (
              <>
                <textarea
                  placeholder="댓글을 작성하세요"
                  onChange={handleInputValue}
                  value={commentContent}
                ></textarea>
                <button onClick={submitComment}>댓글 달기</button>
              </>
            ) : null}
          </div>
          <div className="comments-list-wrapper">
            <div>
              {comments.length !== 0
                ? comments.map(comment => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      commentEditCallback={commentEditCallback}
                      boardId={id}
                      commentContent={commentContent}
                      setComments={setComments}
                      isLogin={isLogin}
                    />
                  ))
                : null}
            </div>
          </div>
        </section>
      </ArticleDetail>
    </Box>
  );
}
