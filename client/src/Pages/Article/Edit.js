import { useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import axios from 'axios';


export default function Edit({ currentArticle, setCurrentArticle, isLogin }) {
  console.log('/edit으로 내려준 게시글 정보', currentArticle);
  // const [article, setArticle] = useState({
  //   title: '',
  //   content: '',
  // });
  const editorRef = useRef();
  const navigate = useNavigate();

  //* 입력한 본문으로 전역 상태 값 변경
  const changeContentInput = () => {
    setCurrentArticle({
      ...currentArticle,
      content: editorRef.current.getInstance().getMarkdown(),
    });
  };
  //* 입력한 제목으로 전역 상태 값 변경
  const handleTitleInput = e => {
    setCurrentArticle({ ...currentArticle, title: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .put(
        `http://15.164.104.171/boards/${currentArticle.id}`,
        {
          title: currentArticle.title,
          content: currentArticle.content,
        },
        {
          headers: { Accept: 'application/json' },
        },
      )
      .then(resp => {
        console.log(resp.data);
        //* 수정 전 조회중이던 게시글 상세페이지로 이동
        alert("게시글이 수정되었습니다")
        navigate(`/${currentArticle.id}`);
      })
      .catch(()=> alert("게시글 수정에 실패했습니다"));
  };

  return isLogin ? (
    <section className="wrtie">
      <div>
        <input
          value={currentArticle.title}
          placeholder="제목을 입력하세요"
          onChange={handleTitleInput}
        ></input>
      </div>
      <div>
        <Editor
          initialValue={currentArticle.content}
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          onChange={changeContentInput}
          ref={editorRef}
        />
      </div>
      <button onClick={() => navigate(-1)}>나가기</button>
      <button onClick={handleSubmit}>수정 완료</button>
    </section>
  ) : (
    <Navigate to="/" />
  );
}
