import styled from 'styled-components';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

export const ModalBackdrop = styled.div`
  position: fixed; //전체화면에 깔리도록..
  z-index: 999; //가장 큰 인덱스는 가장 위에 올라오게 되는데, 확장성을 고려해서 이후에 다른 요소에 의해 배경이 깔리지 않도록 하는것이다.
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4); //opacity속성은 상속되므로 사용 안한다.
  display: grid;
  place-items: center; // 배경 가운데 오는 아이템을 가운데 오도록 만드는 속성
`;

export const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 350px;
  height: 600px;
  justify-content: center;
  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`;

export default function LoginModal({
  openLoginModalHandler,
  modalToggleHandler,
  isMember,
  isLogin,
  setIsLogin,
}) {
  return (
    <ModalBackdrop onClick={openLoginModalHandler}>
      <ModalView onClick={e => e.stopPropagation()}>
        <div onClick={openLoginModalHandler} className="close-btn">
          &times;
        </div>
        <section>
          {isMember ? (
            <SignupForm
              modalToggleHandler={modalToggleHandler}
              openLoginModalHandler={openLoginModalHandler}
            />
          ) : (
            <SigninForm
              modalToggleHandler={modalToggleHandler}
              openLoginModalHandler={openLoginModalHandler}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          )}
        </section>
      </ModalView>
    </ModalBackdrop>
  );
}
