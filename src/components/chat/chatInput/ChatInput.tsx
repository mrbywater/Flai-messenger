import './ChatInput.scss';
import { Textarea, ActionIcon } from '@mantine/core';
import { IconSend2 } from '@tabler/icons-react';
import { useRef } from 'react';

type ChatInputProps = {
  setValue: (value: string) => void;
};

const ChatInput = (props: ChatInputProps) => {
  const { setValue } = props;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const setValueHandler = () => () => {
    const value = textAreaRef.current?.value || '';
    setValue(value);
    textAreaRef.current!.value = '';
  };

  return (
    <div className="chatInputMainContainer">
      <Textarea
        placeholder="Enter your request..."
        rightSectionWidth={42}
        variant="unstyled"
        autosize
        maxRows={15}
        ref={textAreaRef}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color="#575757"
            variant="subtle"
            onClick={setValueHandler()}>
            <IconSend2 style={{ width: '24px', height: '24px' }} stroke={1.5} />
          </ActionIcon>
        }
      />
    </div>
  );
};

export default ChatInput;
