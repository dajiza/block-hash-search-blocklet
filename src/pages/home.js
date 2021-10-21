import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input, message } from 'antd';

const { Search } = Input;
const Home = () => {
  const history = useHistory();
  const onSearch = (value) => {
    if (!value) {
      message.info('Please enter Block Hash');
      return;
    }
    history.push('/transaction', {
      block: value,
    });
  };
  return (
    <div className="home">
      <div className="title">Block Hash Search</div>
      <Search
        className="search-input"
        placeholder="input Block Hash"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
};

export default Home;
