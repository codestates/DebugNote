import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import axios from 'axios';

export default function Article() {
  const [content, setContent] = useState('');

  const load = () => {
    console.log('함수 작동');
    axios
      .get('http://15.164.104.171/board/1', {
        headers: { Accept: 'application/json' },
      })
      .then(resp => {
        console.log('응답도 받음', resp.data.board);
        setContent(resp.data.board[0].content);
      });
  };

  console.log('상태', content);

  return (
    <div>
      <button onClick={load}>게시물 불러오기</button>
      <Viewer
        initialValue={content}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
}

/*     helloWorld!
![이미지](https://theorydb.github.io/assets/img/think/2019-06-25-think-future-ai-1.png "인공지능")
let
const
return 
if 
* cool
*/
