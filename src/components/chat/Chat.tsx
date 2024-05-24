import './Chat.scss';
import Ad from '../ad/Ad';
import ChatBoard from './chatBoard/ChatBoard';
import ChatInput from './chatInput/ChatInput';
import { useState } from 'react';

const Chat = () => {
  const [messageValue, setMessageValue] = useState<string>('');

  return (
    <div className="chatMainContainer">
      <Ad />
      <ChatBoard messageValue={messageValue} />
      <ChatInput setValue={setMessageValue} />
    </div>
  );
};

export default Chat;
