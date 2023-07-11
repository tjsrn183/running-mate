import React from 'react';
interface Props {
  letter: string;
}
const ChatPage = ({ letter }: Props) => {
  return <div>{letter}</div>;
};
ChatPage.defaultProps = {
  letter: '채팅페이지'
};
export default ChatPage;
