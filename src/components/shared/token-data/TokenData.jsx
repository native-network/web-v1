import React from 'react';
import { formatUsd, formatCrypto } from '../../../utils/helpers';
import { getWeb3ServiceInstance } from '../../../web3/Web3Service';

const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;

function TokenData({ containerClass, currency, prices }) {
  const { price, totalSupply } = currency;

  const priceUSD = price * (fromWei(prices.ntvWei) * prices.ethUSD);
  const marketCap = totalSupply * priceUSD;

  const tokenValue = `${formatCrypto(fromWei(prices.ntvWei))} ETH (${formatUsd(
    priceUSD,
  )})`;

  return (
    <div className={containerClass}>
      <dl>
        <div>
          <dt>Token Value</dt>
          <dd>{tokenValue}</dd>
        </div>
        <div>
          <dt>Market Cap</dt>
          <dd>{`${formatUsd(marketCap)}`}</dd>
        </div>
      </dl>
    </div>
  );
}

export default TokenData;
