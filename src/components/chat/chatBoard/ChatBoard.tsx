import './ChatBoard.scss';
import Message from '../message/Message';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import useWebSocket from '../../../hooks/useWebSocket';

type ChatBoardProps = {
  messageValue: string;
  setLoader: (value: boolean) => void;
};

type MessageArr = {
  message: string;
  timestamp: Date;
};

type MutationData = {
  user_id: number | string;
  conversation_id: string;
  user_prompt: string;
  is_user_authorized_through_tiktok: boolean;
  user_tiktok_nickname?: string | null;
  user_region: string | null;
  authorization: string | null;
};

const ChatBoard = (props: ChatBoardProps) => {
  const { messageValue, setLoader } = props;

  const queryClient = useQueryClient();

  const [messageArr, setMessageArr] = useState<MessageArr[]>([]);
  const { ws, socketConnected } = useWebSocket(
    'wss://gi-llm.gromus.io/test_task/websockets',
  );
  const [answer, setAnswer] = useState<string>(' ');

  const { mutate } = useMutation(
    (data: MutationData) => {
      return new Promise<string>((resolve, reject) => {
        if (socketConnected) {
          ws?.send(JSON.stringify(data));
          resolve('Данные отправлены через WebSocket');
        } else {
          reject('WebSocket не подключен');
        }
      });
    },
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.error(error);
      },
    },
  );

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log('Полученный ответ через WebSocket:', data);
        setAnswer(prevMessage => prevMessage + ' ' + data.Text);
        queryClient.setQueryData('someQueryKey', data);
      };
    }
  }, [ws, queryClient]);

  //for test answer
  useEffect(() => {
    if (answer.length === 89) {
      setMessageArr([
        ...messageArr,
        {
          message: answer.slice(0, 74),
          timestamp: new Date(),
        },
      ]);

      setAnswer(' ');
    }

    messageArr.length % 2 ? setLoader(true) : setLoader(false);
  }, [answer]);

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

    mutate({
      user_id: 0,
      conversation_id: '0',
      user_prompt: messageValue,
      is_user_authorized_through_tiktok: false,
      user_region: 'uk-UA',
      authorization: '',
    });
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
