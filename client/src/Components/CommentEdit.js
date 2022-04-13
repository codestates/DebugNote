import { useState } from 'react';

export default function Comment({
  comment,
  setIsEditing,
  commentEditCallback,
}) {
  const [currentComment, setCurrentComment] = useState({});

  const handleInputValue = e => {
    setCurrentComment({ ...comment, comment: e.target.value });
  };

  return (
    <div className="comment-edit-wrapper">
      <textarea className="comment-edit-input" onChange={handleInputValue}>
        {comment.content}
      </textarea>
      <div className="comment-edit-button-wrapper">
        <span onClick={() => setIsEditing(false)}>취소</span>
        <span
          onClick={() => {
            setIsEditing(false);
            commentEditCallback(currentComment);
          }}
        >
          완료
        </span>
      </div>
    </div>
  );
}
