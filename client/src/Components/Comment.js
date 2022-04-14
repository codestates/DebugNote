import { useState } from 'react';
import CommentEdit from './CommentEdit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.section`
  border-bottom: 1px solid #e0e0e0;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  > section {
    /* border: 1px solid pink; */
    display: flex;
    align-items: flex-end;
    > div:not(.comment-timestamp) {
      margin-right: 0.5rem;
      font-weight: bold;
    }
    > .comment-timestamp {
      font-size: 0.6rem;
    }
  }
  > .comment-button-wrapper {
    display: flex;
    justify-content: flex-end;
    > button {
      border: none;
      background-color: #ffffff;
      margin-left: 1rem;
      padding: 0 0.4rem;
      font-weight: bold;
    }
  }
`;

export default function Comment({
  comment,
  commentEditCallback,
  boardId,
  commentContent,
  setIsEditing,
  setComments,
  isLogin,
  myId,
  commentUserId,
}) {
  console.log('<Comment /> props로 내려받은 댓글 상세 정보', comment);
  console.log(
    '<Comment /> 유저 아이디와 댓글 작성자 아이디 비교',
    '#댓글',
    comment.id,
    '#로그인 pk',
    myId,
    '#댓글작성자',
    comment.userId,
    comment.userId === myId,
  );
  const [isClicked, setIsCliked] = useState(false);
  // const navigate = useNavigate();
  const id = boardId;
  /**
  comment {
  id,
  nickname,
  comment,
  updatedAt,
  createdAt,
  }
   */

  // 댓글 삭제
  const deleteComment = () => {
    axios
      .delete(`http://15.164.104.171/comments/${id}`, {
        data: { commentId: comment.id },
      })
      .then(response => {
        setComments(response.data.comment);
        alert('삭제되었습니다');
        // 삭제된 댓글 제외한 모든 댓글 응답으로 옴
      })
      .catch(() => alert('다른 사람의 댓글은 삭제할 수 없습니다'));
  };

  const parsedDate = new Date(comment.createdAt).toLocaleDateString('ko-kr');
  return (
    <Box className="comment-wrapper">
      <section>
        <div className="comment-nick">{comment.nickname}</div>
        <div className="comment-timestamp">{parsedDate}</div>
      </section>
      {/*클릭되었고, 현재 사용자의 아이디와 일치하는 경우에만 열리도록.*/}
      {isClicked && comment.userId === Number(myId) ? (
        <CommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          commentEditCallback={commentEditCallback}
          boardId={boardId}
          commentContent={commentContent}
          setIsClicked={setIsCliked}
        />
      ) : (
        <div className="comment-content">
          <div>{comment.comment}</div>
        </div>
      )}
      {isLogin && comment.userId === Number(myId) ? (
        <div className="comment-button-wrapper">
          <button onClick={() => setIsCliked(true)}>수정 </button>
          <button onClick={deleteComment}>삭제</button>
        </div>
      ) : null}
    </Box>
  );
}
