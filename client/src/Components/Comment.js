import { useState } from 'react';
import CommentEdit from './CommentEdit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Comment({
  comment,
  commentEditCallback,
  boardId,
  commentContent,
  setIsEditing,
  setComments,
}) {
  console.log('<Comment /> props로 내려받은 댓글 상세 정보', comment);
  const [isClicked, setIsCliked] = useState(false);
  const navigate = useNavigate();
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
        if (response.status === 400) {
          return alert('댓글 삭제 불가합니다');
        }
        console.log(response.data.comment);
        // 삭제된 댓글 제외한 모든 댓글 응답으로 옴

        setComments(response.data.comment);
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="comment-wrapper">
      <div className="comment-nick">닉네임: {comment.nickname}</div>
      <div className="comment-timestamp">타임스탬프: {comment.createdAt}</div>
      {isClicked ? (
        <CommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          commentEditCallback={commentEditCallback}
          boardId={boardId}
          commentContent={commentContent}
          setIsClicked={setIsCliked}
        />
      ) : (
        <div>
          <div className="comment-content">내용: {comment.comment}</div>
          <div className="comment-button-wrapper">
            <span onClick={() => setIsCliked(true)}>[수정] </span>
            <span onClick={deleteComment}>[삭제]</span>
          </div>
        </div>
      )}
    </section>
  );
}
