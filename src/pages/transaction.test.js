import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transaction from './transaction';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import axios from 'axios';

describe('Transaction', () => {
  it('initialize', () => {
    const history = createMemoryHistory();
    const state = { block: '0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103' };
    history.push('/transaction', state);
    const wrapper = render(
      <Router history={history}>
        <Transaction />
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
