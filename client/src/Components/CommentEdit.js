export default function Comment({ comment, setIsEditing, setComments }) {
  const handleCommentEdit = e => {
    const result = { ...comment, comment: e.target.value };
    // commentEditCallback(result);
  };

  return (
    <div className="comment-edit-wrapper">
      <textarea className="comment-edit-input" onChange={handleCommentEdit}>
        {comment.content}
      </textarea>
      <div className="comment-edit-button-wrapper">
        <span onClick={() => setIsEditing(false)}>취소</span>
        <span onClick={() => setIsEditing(false)}>완료</span>
      </div>
    </div>
  );
}
