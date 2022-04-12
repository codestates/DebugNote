import { useState } from 'react';
import CommentEdit from './CommentEdit';
//! API 댓글 내용 content인지 comment인지 -> comment로 확인 받음
//! 댓글 수정 삭제에 commentId 요청으로 필요함
export default function Comment({ comment, setComents }) {
  console.log('comment---->', comment);
  /**
  comment {
  id,
  nickname,
  comment,
  updatedAt,
  createdAt,
  }
   */

  const [isEditing, setIsEditing] = useState(false);

  // const handleCommentButton (value) => (e) => {

  // }

  return (
    <section className="comment-wrapper">
      <div className="comment-nick"></div>
      <div className="comment-timestamp"></div>
      {isEditing ? (
        <CommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          setComents={setComents}
        />
      ) : (
        <div className="comment-content"></div>
      )}
      <div className="comment-button-wrapper">
        <span>수정</span>
        <span>삭제</span>
      </div>
    </section>
  );
}

// <section className="comment-wrapper">
// <div className="comment-nick">{comment.nickname}</div>
// <div className="comment-content">{comment.content}</div>
// <div className="comment-timestamp">{comment.createdAt}</div>
// <div className="comment-button-wrapper">
//   <span>수정</span>
//   <span>삭제</span>
// </div>
// </section>
