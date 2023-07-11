import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <div>메인페이지</div>
      <button onClick={() => modalRef?.current?.showModal()}>회원가입</button>;
      <dialog ref={modalRef}>
        <form>
          <input
            type="text"
            id="user_id"
            placeholder="id를 입력해주세요"
          ></input>
        </form>
      </dialog>
    </div>
  );
};
export default MainPage;
