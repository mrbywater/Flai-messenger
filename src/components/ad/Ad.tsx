import './Ad.scss';
import { Button } from '@mantine/core';

const Ad = () => {
  return (
    <div className="mainExtraContentContainer">
      <div>
        <span>Free Plan</span>
        <span>There are 10 free requests left</span>
      </div>
      <Button variant="filled" radius="sm" size="xs" color="black">
        Buy Premium
      </Button>
    </div>
  );
};

export default Ad;
