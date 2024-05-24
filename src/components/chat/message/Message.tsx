import './Message.scss';
import { DATA } from '../../../constants';
import TextAnimation from '../../textAnimation/TextAnimation';

const getTimePassed = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `1m ago`;
};

type MessageProps = {
  index: number;
  message: string;
  timestamp: Date;
};

const Message = (props: MessageProps) => {
  const { index, message, timestamp } = props;

  const dataIndex: number = index % 2;

  return (
    <div className="messageMainContainer">
      <div className="accountContainer">
        <div>
          <img src={DATA[dataIndex].avatar} alt={DATA[dataIndex].name} />
          <span>{DATA[dataIndex].name}</span>
        </div>
        <span>{getTimePassed(timestamp)}</span>
      </div>
      <div className="textMessage">
        {dataIndex === 0 ? (
          <span>{message}</span>
        ) : (
          <TextAnimation messageText={message} />
        )}
      </div>
    </div>
  );
};

export default Message;
