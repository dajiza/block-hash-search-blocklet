import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';
import * as dayjs from 'dayjs';
import fomatFloat from '../util';
import Loading from './loading';
import Error from './error';

const Transaction = () => {
  const history = useHistory();
  const [blockData, setBlockData] = useState();
  const [transactions, setTransactions] = useState();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const blockHash = history.location.state.block;
    axios
      .get(`https://blockchain.info/rawblock/${blockHash}`)
      .then((response) => {
        setBlockData(response.data);
        const newTransactions = [];
        const totalPage = response.data.tx.length;
        for (let i = 0; i < totalPage; i += 5) {
          newTransactions.push(response.data.tx.slice(i, i + 5));
        }
        setTransactions(newTransactions);
        setList(newTransactions[0]);
        setTotal(totalPage);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);
  const onPageChange = (page) => {
    const newList = transactions[page - 1];
    setCurrentPage(page);
    setList(newList);
  };
  return (
    <div className="transaction">
      {isLoading && <Loading />}
      {isError && <Error />}
      {blockData && (
        <>
          <div className="summary">
            <div className="title">Block {blockData.height}</div>
            <div className="paragraph">
              This block was mined on {dayjs.unix(blockData.time).format('ddd, MMM D, YYYY h:mm A')} by Poolin. It
              currently has 43,190 confirmations on the Bitcoin blockchain.
            </div>
            <div className="paragraph">
              The miner(s) of this block earned a total reward of 6.25000000 BTC ($388,359.38). The reward consisted of
              a base reward of 6.25000000 BTC ($388,359.38) with an additional 0.16583560 BTC ($10,304.61) reward paid
              as fees of the 912 transactions which were included in the block. The Block rewards, also known as the
              Coinbase reward, were sent to this address.
            </div>
            <div className="paragraph">
              A total of 306.51676953 BTC ($19,046,185.77) were sent in the block with the average transaction being
              0.33609295 BTC ($20,883.98). Learn more about how blocks work.
            </div>
            <div className="detail">
              <div className="rows">
                <div className="label">Hash</div>
                <div className="content">{blockData.hash}</div>
              </div>
              <div className="rows">
                <div className="label">Confirmations</div>
                <div className="content">{blockData.height}</div>
              </div>
              <div className="rows">
                <div className="label">Timestamp</div>
                <div className="content">{dayjs.unix(blockData.time).format('YYYY-MM-DD HH:mm')}</div>
              </div>
              <div className="rows">
                <div className="label">Height</div>
                <div className="content">{blockData.height}</div>
              </div>
              <div className="rows">
                <div className="label">Miner</div>
                <div className="content">{blockData.height}</div>
              </div>
              <div className="rows">
                <div className="label">Number of Transactions</div>
                <div className="content">{blockData.tx.length}</div>
              </div>
              <div className="rows">
                <div className="label">Difficulty</div>
                <div className="content">{blockData.height}</div>
              </div>
              <div className="rows">
                <div className="label">Merkle root</div>
                <div className="content">{blockData.mrkl_root}</div>
              </div>
              <div className="rows">
                <div className="label">Version</div>
                <div className="content">{blockData.ver}</div>
              </div>
              <div className="rows">
                <div className="label">Bits</div>
                <div className="content">{blockData.bits.toLocaleString()}</div>
              </div>
              <div className="rows">
                <div className="label">Weight</div>
                <div className="content">{blockData.weight.toLocaleString()} WU</div>
              </div>
              <div className="rows">
                <div className="label">Size</div>
                <div className="content">{blockData.size.toLocaleString()} bytes</div>
              </div>
              <div className="rows">
                <div className="label">Nonce</div>
                <div className="content">{blockData.nonce.toLocaleString()}</div>
              </div>
              <div className="rows">
                <div className="label">Transaction Volume</div>
                <div className="content">{blockData.height}</div>
              </div>
              <div className="rows">
                <div className="label">Block Reward</div>
                <div className="content">{blockData.height}</div>
              </div>
              <div className="rows">
                <div className="label">Fee Reward</div>
                <div className="content">{fomatFloat(blockData.fee)} BTC</div>
              </div>
            </div>
          </div>
          <div className="list">
            <div className="title">Block Transactions</div>
            {list.map((item) => {
              return (
                <div className="item" key={item.hash}>
                  <div className="row">
                    <div className="column">
                      <div className="label">Fee</div>
                      <div className="content">
                        <div>{fomatFloat(item.fee)} BTC</div>
                        <div>(0.000 sat/B - 0.000 sat/WU - {item.size} bytes)</div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="label">Amount</div>
                      <div className="content amount">
                        {fomatFloat(
                          item.out.reduce((prev, cur) => {
                            return prev + cur.value;
                          }, 0)
                        )}
                        BTC
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <div className="label">Hash</div>
                      <div className="content">
                        <Link to="/">{item.hash}</Link>
                      </div>
                    </div>
                    <div className="column">
                      <div className="label">Date</div>
                      <div className="content">{dayjs.unix(item.time).format('YYYY-MM-DD HH:mm')}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <div className="label">From</div>
                      <div className="content">
                        {item.inputs.map((e) => {
                          if (e?.prev_out?.addr) {
                            return (
                              <div className="to">
                                <div className="addr">
                                  <Link to="/">{e.prev_out.addr}</Link>
                                </div>
                                <div className="btc">{fomatFloat(e.prev_out.value)} BTC</div>
                              </div>
                            );
                          }
                          return <div className="newly">COINBASE (Newly Generated Coins)</div>;
                        })}
                      </div>
                    </div>
                    <div className="column">
                      <div className="label">To</div>
                      <div className="content">
                        {item.out.map((e) => {
                          if (e.addr) {
                            return (
                              <div className="to">
                                <div className="addr">
                                  <Link to="/">{e.addr}</Link>
                                </div>
                                <div className="btc">{fomatFloat(e.value)} BTC</div>
                              </div>
                            );
                          }
                          return '';
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination
              current={currentPage}
              total={total}
              pageSize={5}
              onChange={onPageChange}
              showSizeChanger={false}
              simple
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Transaction;
