module.exports = {
  idValidator: id => {
    const regExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regExp.test(id);
  },

  pwValidator: pw => {
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return regExp.test(pw);
  },

  pwMatchValidator: (pw, pwconfirm) => {
    if (pw === '' || pwconfirm === '') return false;
    return pw === pwconfirm;
  },

  nicknameValidator: nickname => {
    const regExp = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;

    return regExp.test(nickname);
  },

  nameValidator: name => {
    return name !== '';
  },

  selectValidator: option => {
    console.log(option, '선택한 값');
    console.log(option === '직업을 선택하세요');
    return option !== '직업을 선택하세요';
  },
};
