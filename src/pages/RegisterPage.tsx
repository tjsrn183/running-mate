import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledDialog = styled.dialog`
  background-color: white;
  padding: 30px;
  width: 80%;
  max-width: 500px;
  margin: auto;
`;
const RegisterPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <button onClick={() => modalRef?.current?.showModal()}>회원가입</button>
      <StyledDialog ref={modalRef}>
        <form>
          <div className="field">
            <p>아이디</p>
            <span className="placehold-text">
              <input type="text" />
            </span>
          </div>
          <div className="field">
            <p>비밀번호</p>
            <input className="userpw" type="password" />
          </div>
          <div className="field">
            <p>비밀번호 재확인</p>
            <input className="userpw-confirm" type="password" />
          </div>
          <div className="field">
            <p>이름</p>
            <input type="text" />
          </div>
          <div className="field birth">
            <p>생년월일</p>
            <div>
              <input type="date" placeholder="년(4자)" />
            </div>
          </div>

          <div className="field gender">
            <p>성별</p>
            <div>
              <label>
                <input type="radio" name="gender" />
                남자
              </label>
              <label>
                <input type="radio" name="gender" />
                여자
              </label>
              <label>
                <input type="radio" name="gender" />
                선택안함
              </label>
            </div>
          </div>
          <button type="submit">가입</button>
          <button type="reset">초기화</button>
          <button onClick={() => modalRef?.current?.close()}>닫기</button>
        </form>
      </StyledDialog>
    </div>
  );
};
export default RegisterPage;
