import axios from 'axios';

axios.defaults.withCredentials = false;

function allArticleApi() {
  console.log('ajax요청');
  //서버 api 완성되면 사용할 코드
  let endpoint = 'http://15.164.104.171:80/?page=2&start=11&limit=20'; // 2페이지에 아이디가 11이상 20이하인 것들을 보여주기
  return axios.get(endpoint, {
    headers: { Accept: 'application/json' },
  });
}

export default allArticleApi;
