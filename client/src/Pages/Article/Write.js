import { useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import axios from 'axios';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get(
  'accToken',
)}`;

export default function Write({ setCurrentArticle }) {
  const editorRef = useRef();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });

  const onChangeIntroFunction = () => {
    setArticle({
      ...article,
      content: editorRef.current.getInstance().getMarkdown(),
    });
  };

  const handleArticleInputValue = key => e => {
    setArticle({ ...article, [key]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(
        'http://15.164.104.171/boards',
        {
          title: article.title,
          content: article.content,
        },
        {
          headers: { Accept: 'application/json' },
          // withCredentials: true,
        },
      )
      .then(resp => {
        setCurrentArticle(article);
        console.log(resp.data);
        //! 응답으로 board pk 받아야함 -> 백엔드에 추가 요청함 -> boardId 받음
        //! 작성한 글 상세페이지로 이동
        navigate(`/${resp.data.boardId}`);
      })
      .catch(console.log);
  };

  return cookies.get('accToken') ? (
    <section className="wrtie">
      <div>
        <textarea
          placeholder="제목을 입력하세요"
          onChange={handleArticleInputValue('title')}
        ></textarea>
      </div>
      <div>
        <Editor
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          onChange={onChangeIntroFunction}
          ref={editorRef}
        />
      </div>
      <button onClick={() => navigate(-1)}>나가기</button>
      <button onClick={handleSubmit}>작성완료</button>
    </section>
  ) : (
    <Navigate to="/" />
  );
}
