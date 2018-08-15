import React from 'react';

function TokenData({
  containerClass,
  isMobile,
  value,
  marketCap,
  devFund,
  reserve,
  reserveRatio,
}) {
  return (
    <div className={containerClass}>
      <dl>
        <div>
          <dt>Token Value</dt>
          <dd>{value}</dd>
        </div>
        <div>
          <dt>Market Cap</dt>
          <dd>{marketCap}</dd>
        </div>
        <div>
          <dt>Dev Fund</dt>
          <dd>{devFund}</dd>
        </div>
        <div>
          <dt>Reserve</dt>
          <dd>
            {reserve} {isMobile && `(${reserveRatio})`}
          </dd>
        </div>
        {!isMobile && (
          <div>
            <dt>Reserve Ratio</dt>
            <dd>{reserveRatio}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export default TokenData;
