import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import styled from 'styled-components';

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

export const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  background-color: #ffffff;
  width: 530px;
  height: 650px;
  align-items: center;
  padding: 1.5rem 1.5rem;
  justify-content: center;
  padding: 0.5rem 1rem;
  > div.close-btn {
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
    cursor: pointer;
  }
  > section {
    width: 100%;
    height: 95%;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    > .signupform {
      > h2 {
        margin-bottom: 1rem;
      }
      width: 95%;
      height: 75%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > .ismember {
        font-size: 0.7rem;
        font-weight: bold;
      }
      > .guide {
        width: 85%;
        display: flex;
        justify-content: flex-end;
        font-size: 0.6rem;
      }
    }
  }
`;

export default function LoginModal({
  openLoginModalHandler,
  modalToggleHandler,
  isMember,
  isLogin,
  setIsLogin,
  setMyId,
  myId,
}) {
  return (
    <ModalBackdrop onClick={openLoginModalHandler}>
      <ModalView onClick={e => e.stopPropagation()}>
        <div onClick={openLoginModalHandler} className="close-btn">
          <i className="fa-solid fa-xmark"></i>
        </div>
        {isMember ? (
          <SigninForm
            modalToggleHandler={modalToggleHandler}
            openLoginModalHandler={openLoginModalHandler}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            setMyId={setMyId}
            myId={myId}
          />
        ) : (
          <SignupForm
            modalToggleHandler={modalToggleHandler}
            openLoginModalHandler={openLoginModalHandler}
            setMyId={setMyId}
            myId={myId}
          />
        )}
      </ModalView>
    </ModalBackdrop>
  );
}
