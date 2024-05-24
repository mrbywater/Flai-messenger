import './ChatBoard.scss';
import Message from '../message/Message';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryClient } from 'react-query';

const ws = new WebSocket('wss://gi-llm.gromus.io/test_task/websokets');

type ChatBoardProps = {
  messageValue: string;
};

type MessageArr = {
  message: string;
  timestamp: Date;
};

const ChatBoard = (props: ChatBoardProps) => {
  const { messageValue } = props;

  const queryClient = useQueryClient();

  const [messageArr, setMessageArr] = useState<MessageArr[]>([]);
  // const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket соединение установлено');
      // setSocketConnected(true);
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log('Полученный ответ через WebSocket:', data);
      queryClient.setQueryData('someQueryKey', data);
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket ошибка:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket соединение закрыто');
      // setSocketConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [queryClient]);

  useEffect(() => {
    if (messageValue.length !== 0) {
      setMessageArr([
        ...messageArr,
        {
          message: messageValue,
          timestamp: new Date(),
        },
      ]);
    }
  }, [messageValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageArr(messageArr => [...messageArr]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chatBoardMainContainer">
      <div className="chatContent">
        <AnimatePresence>
          {messageArr?.map((item, index) => (
            <motion.div
              key={`key_of_message_${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}>
              <Message
                index={index}
                message={item.message}
                timestamp={item.timestamp}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatBoard;
