//import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// import axios from 'axios';

export default function Article(props) {
  let { id } = useParams();
  //전체 게시글 프롭스로 받아서 정확하게 아이디가 일치라는 게시글만 뷰어에게 내려준다.
  let matchedArticle = props.currentArticle.find(item => item.id == id);
  // const [content, setContent] = useState('');

  // const load = () => {
  //   console.log('함수 작동');
  //   axios
  //     .get(`http://15.164.104.171/board/${id}`, {
  //       headers: { Accept: 'application/json' },
  //     })
  //     .then(resp => {
  //       console.log('응답도 받음', resp.data.board);
  //       setContent(resp.data.board[0].content);
  //     });
  // };

  console.log('상태', matchedArticle);

  return (
    <div>
      <button>상세페이지에서만 보이는버튼</button>
      {/* <button onClick={load}>게시물 불러오기</button> */}
      <Viewer
        initialValue={matchedArticle.content} //여기에는 콘텐트만 들어가야 할 것 같다. 제목은 별도의 태그로 작성
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
