import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CommentMod = styled.div`
  margin: 1rem;
  display: flex;
  /* flex-direction:column; */
  /* align-items: flex-end; */
  > textarea {
    width: 100%;
    margin-right: 1rem;
    height: 3rem;
    resize: none;
    font-size: 1.2rem;
    &:focus {
      outline: none;
    }
    > .comment-edit-button-wrapper {
      display: flex;
      margin-bottom: 0.5rem;
    }
  }
`;

export default function Comment({
  comment,
  commentEditCallback,
  boardId,
  commentContent,
  setIsClicked,
}) {
  const [currentCommentInput, setCurrentCommentInput] = useState('');
  const navigate = useNavigate();
  const handleInputValue = e => {
    setCurrentCommentInput(e.target.value);
  };

  // 댓글 수정
  const submitEditedComment = () => {
    console.log(comment.id);
    let id = boardId;
    axios
      .put(
        `http://15.164.104.171/comments/${id}`,
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

        commentEditCallback(resp.data.comment[0]);
        setIsClicked(false);
        setCurrentCommentInput('');
        alert('수정되었습니다.');
      })
      .catch(() => alert('다른 사람의 댓글은 수정할 수 없습니다'));

    console.log('<CommentEdit /> 내려받은 댓글 ', commentContent);
  };

  return (
    <CommentMod className="comment-edit-wrapper">
      <textarea
        className="comment-edit-input"
        value={currentCommentInput}
        onChange={handleInputValue}
      ></textarea>
      <div className="comment-edit-button-wrapper">
        <button onClick={() => setIsClicked(false)}>취소</button>
        <button onClick={submitEditedComment}>완료</button>
      </div>
    </CommentMod>
  );
}
