export default function Comment() {
  return (
    <section className="comment-wrapper">
      <div className="comment-nick">닉네임</div>
      <div className="comment-content">댓글 내용</div>
      <div className="comment-timestamp">작성일</div>
      <button>삭제</button>
    </section>
  );
}
