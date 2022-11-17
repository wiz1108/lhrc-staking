import React from 'react';

import './ConfirmTransactionModal.scss'

const ConfirmTransactionModal = ({ closeModal, modalType, unstakeNft, onClickViewStakedTokens, harvestRewards, harvestingReward, stakeAmount, decimals, unstaked, staked, stakedTokensFlag, tokenSwitch }) => {
  return (
    <div>
      <div className='bodySuccess'>
        <div className='cross' onClick={closeModal}>&times;</div>
        <p className='p1'>Confirm Transaction</p>
        <p className='p2 mt-4'>Swapping 100.0 CRO for 5.0 LHRC</p>
        <div className='viewBtnSection'>
          <button className='viewBtn mt-5' onClick={unstakeNft}>Please confirm transaction in your wallet</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmTransactionModal