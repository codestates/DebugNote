import { useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import axios from 'axios';

export default function Write() {
  //   const [article, setArticle] = useState({
  //     title: '',
  //     content: '',
  //   });
  const editorRef = useRef();

  //   const content = editorRef.current.getInstance().getMarkdown();

  const onChangeIntroFunction = () => {
    console.log(editorRef.current.getInstance().getMarkdown());
  };

  //   const handleArticleInputValue = key => e => {
  //     setArticle({ ...article, [key]: e.target.value });
  //   };

  const handleSubmit = () => {
    axios
      .post(
        'http://15.164.104.171/board',
        {
          title: 'test',
          content: `
          helloWorld!
          ![이미지](https://theorydb.github.io/assets/img/think/2019-06-25-think-future-ai-1.png "인공지능")
          let
          const
          return 
          if 
          * cool
          `,
        },
        {
          headers: { Accept: 'application/json' },
          withCredentials: true,
        },
      )
      .then(resp => {
        console.log(resp.data);
      })
      .catch(console.log);
  };

  return (
    <section className="wrtie">
      <div>
        <textarea placeholder="제목을 입력하세요"></textarea>
      </div>
      <div>
        <Editor
          initialValue="helloWorld!"
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          onChange={onChangeIntroFunction}
          ref={editorRef}
        />
      </div>
      <button>나가기</button>
      <button onClick={handleSubmit}>작성완료</button>
    </section>
  );
}
