import React, { useEffect, useState } from 'react';

type TextAnimationProps = {
  messageText: string;
};

const TextAnimation = ({ messageText }: TextAnimationProps) => {
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < messageText.length - 1) {
        setAnimatedText(prevText => prevText + messageText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [messageText]);

  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {animatedText}
    </pre>
  );
};

export default TextAnimation;
