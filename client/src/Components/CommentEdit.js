import axios from 'axios';
import { useState } from 'react';

export default function Comment({
  comment,
  commentEditCallback,
  boardId,
  commentContent,
  setIsClicked,
}) {
  const [currentCommentInput, setCurrentCommentInput] = useState('');

  const handleInputValue = e => {
    setCurrentCommentInput(e.target.value);
  };

  // 댓글 수정
  const submitEditedComment = () => {
    console.log(comment.id);
    axios
      .put(
        `http://15.164.104.171/comments/${boardId}`,
        {
          commentId: comment.id,
          comment: currentCommentInput,
        },
        {
          headers: { Accept: 'application/json' },
        },
      )
      .then(resp => {
        // console.log(resp.data);
        // 수정 중인 상태 false로 바꾸고
        // 전역(article)에 있는 핸들러에 현재 입력된 코멘트 밸류 전달
        // 핸들러 안에서 setcomments

        if (resp.status === 400) {
          return alert('댓글 수정 불가합니다');
        }
        commentEditCallback(resp.data.comment[0]);
        setIsClicked(false);
        setCurrentCommentInput('');
      })
      .catch(console.log);

    console.log('<CommentEdit /> 내려받은 댓글 ', commentContent);
  };

  return (
    <div className="comment-edit-wrapper">
      <textarea
        className="comment-edit-input"
        value={currentCommentInput}
        onChange={handleInputValue}
      ></textarea>
      <div className="comment-edit-button-wrapper">
        <span onClick={() => setIsClicked(false)}>[취소] </span>
        <span onClick={submitEditedComment}>[완료]</span>
      </div>
    </div>
  );
}
