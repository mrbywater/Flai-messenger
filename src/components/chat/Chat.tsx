import './Chat.scss';
import Ad from '../ad/Ad';
import ChatBoard from './chatBoard/ChatBoard';
import ChatInput from './chatInput/ChatInput';
import { useState } from 'react';

const Chat = () => {
  const [messageValue, setMessageValue] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <div className="chatMainContainer">
      <Ad />
      <ChatBoard messageValue={messageValue} setLoader={setLoader} />
      <ChatInput setValue={setMessageValue} loader={loader} />
    </div>
  );
};

export default Chat;
