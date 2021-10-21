import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Error = () => {
  const history = useHistory();
  const back = () => {
    history.push('/');
  };
  return (
    <div className="error">
      <p>The input is incorrect or the network is wrong</p>
      <p>Please try again</p>
      <Button type="primary" size="large" onClick={back}>
        Back
      </Button>
    </div>
  );
};

export default Error;
