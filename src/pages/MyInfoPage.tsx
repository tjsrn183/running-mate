import React, { useRef } from 'react';
const MyInfoPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      내정보페이지
      <button onClick={() => modalRef?.current?.showModal()}>내정보</button>
      <dialog ref={modalRef}>
        <form>
          <label htmlFor="user_name">
            <p>이름</p>
          </label>
          <input type="text" id="user_name" readOnly />
          <label htmlFor="user_id">
            <p>아이디</p>
          </label>
          <input type="text" id="user_id" readOnly />
          <label htmlFor="user_password">
            <p>비밀번호</p>
          </label>
          <input type="text" id="user_password" readOnly />
          <div className="field gender">
            <label htmlFor="sex">
              <p>성별</p>
            </label>
            <label>
              <input type="radio" id="sex" name="sex" readOnly />
              남자
            </label>
            <label>
              <input type="radio" id="sex" name="sex" readOnly />
              여자
            </label>
          </div>
          <button onClick={() => modalRef?.current?.close()}>
            <p>닫기</p>
          </button>
        </form>
      </dialog>
    </div>
  );
};
export default MyInfoPage;
