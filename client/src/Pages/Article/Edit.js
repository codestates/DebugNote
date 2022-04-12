import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import axios from 'axios';

export default function Edit({ currentArticle }) {
  console.log('/edit으로 내려준 게시글 정보', currentArticle);
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });
  const editorRef = useRef();
  const navigate = useNavigate();

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
      .put(
        'http://15.164.104.171/board',
        {
          title: article.title,
          content: article.content,
        },
        {
          headers: { Accept: 'application/json' },
          withCredentials: true,
        },
      )
      .then(resp => {
        console.log(resp.data);
        //* 수정 전 조회중이던 게시글 상세페이지로 이동
        navigate(currentArticle.id);
      })
      .catch(console.log);
  };

  return (
    <section className="wrtie">
      <div>
        <textarea
          placeholder="제목을 입력하세요"
          onChange={handleArticleInputValue('title')}
        >
          {currentArticle.title}
        </textarea>
      </div>
      <div>
        <Editor
          initialValue={currentArticle.content}
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
      <button onClick={handleSubmit}>수정 완료</button>
    </section>
  );
}
