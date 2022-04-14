import { useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';


import axios from 'axios';

const Section = styled.section`
  /* border: 1px solid blue; */
  /* background-color: #8fbc8f; */
  width: 100vw;
  height: 100vh;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
> .editor-wrapper {
    padding: 1rem;
  }
`;

const Title = styled.div`
  /* border: 1px solid blue; */
  /* background-color: #8fbc8f; */
  font-family: ;
  height: 3rem;
  display: flex;
  align-items: center;
  margin: 2rem 5rem;

> .input {
    font-family: sans-serif;
    height: 4rem;
    font-size: 2rem;
    border: none;
    outline: none;
    resize: none;
    padding: 1rem 0rem 0rem 1rem;
    &:focus {
      border-left: 0.3rem solid #e0e0e0;
    }
  }
`;

const MenuUl = styled.ul`
  /* border: 1px solid black; */
  /* padding: 0 1rem; */
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 100vw;
  padding: 0 1rem 0 1rem;
> li {
    font-size: 1.5rem;
    color: white;
    background-color: black;
    width: 8rem;
    border-radius: 3px;
    /* border: 1px solid pink; */
    display: flex;
    justify-content: center;
    transition: background-color, 0.5s;

    &:hover {
      background-color: white;
      color: black;
      cursor: pointer;
    }
  }
> .submit {
    border: 1px solid #e0e0e0;
    color: black;
    background-color: white;
    transition: background-color, 0.5s;
    &:hover {
      background-color: black;
      color: white;
      cursor: pointer;
      animation-d: 3s ease-in 1s infinite reverse both running;
    }
  }
`;

export default function Write({ setCurrentArticle, isLogin }) {
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

  return isLogin ? (
    <Section>
      <Title>
        <textarea
          className="input"
          placeholder="제목을 입력하세요"
          onChange={handleArticleInputValue('title')}
        ></textarea>
      </Title>
      <div className="editor-wrapper">
        <Editor
          previewStyle="vertical"
          height="900px"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          placeholder={'에러 로그를 기록하세요'}
          onChange={onChangeIntroFunction}
          ref={editorRef}
        />
      </div>
      <MenuUl>
        <li onClick={() => navigate(-1)}>나가기</li>
        <li onClick={handleSubmit} className="submit">
          작성완료
        </li>
      </MenuUl>
    </Section>
  ) : (
    <Navigate to="/" />
  );
}