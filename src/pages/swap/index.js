import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { AiOutlineArrowDown } from "react-icons/ai";
import Web3 from 'web3'

import Navbar from '../menu/navbar';

import './Swap.scss'

import SwapConfirmModal from '../../components/SwapConfirmModal'
import ConfirmTransactionModal from '../../components/ConfirmTransactionModal';

import {
    lhrcStakingContractAddr,
    stakeTokenAddr,
    barncatAddr,
    ponyAddr,
    horseAddr,
    skyboxAddr,
    lpAddr
} from '../../constants'
import nftABI from '../../constants/abi/nft'
import lhrcABI from '../../constants/abi/stakeToken'
import stakingABI from '../../constants/abi/staking'
import lpABI from '../../constants/abi/lp'

import { startAction, endAction, showToast } from '../../actions/common'

let web3 = new Web3(Web3.givenProvider)

const Swap = () => {
    const [swapSwitch, setSwapSwitch] = useState('swap')
    const [scene, setScene] = useState('swap')
    const [stakeNum, setStakeNum] = useState('0.0')
    const [stakedTokensFlag, setStakedTokensFlag] = useState(false)
    const [stakedLpFlag, setStakedLpFlag] = useState(false)
    const [successModalFlag, setSuccessModalFlag] = useState('none')
    const [lhrcBalance, setLhrcBalance] = useState('')
    const [lhrcDecimals, setLhrcDecimals] = useState(0)
    const [nftBalances, setNftBalances] = useState([0, 0, 0, 0])
    const [tokens, setTokens] = useState([])
    const [amplify, setAmplify] = useState(1)
    const [pendingRewards, setPendingRewards] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [totalLPAmount, setTotalLPAmount] = useState('')
    const [lpStaked, setLpStaked] = useState('')
    const [lpReward, setLpReward] = useState('')
    const [lpBalance, setLpBalance] = useState('')
    const [lpDecimals, setLpDecimals] = useState('')
    const [harvestingReward, setHarvestingReward] = useState('')
    const [nftBoostModal, setNftBoostModal] = useState(-1)
    const [showList, setShowList] = useState(true)
    const [staked, setStaked] = useState([0, 0, 0, 0])
    const [unstaked, setUnstaked] = useState('')
    const [stakedImg, setStakedImg] = useState(['', '', '', ''])
    // modal type : stake, unstake, harvest, 
    const [modalType, setModalType] = useState('')
    // Box type: add to stake
    const [boxType, setBoxType] = useState('')
    const { wallet } = useSelector(state => state.common);

    const navigate = useNavigate()

    useEffect(() => {
        const curWallet = localStorage.getItem('wallet')
        if (!curWallet) {
            localStorage.removeItem('wallet')
            navigate('/')
        }

    }, [])
    return (
        <div>
            <div className='bodySwap'>
                <div className='contentSwap'>
                    <Navbar />
                    {
                        scene === 'swap' ? <div className='outer-content'>
                            <div className='box'>
                                <div className='topSection'>
                                    <div className='switchContainer'>
                                        {/* <div className='selected swapFont' onClick={()=>setTokenSwitch(true)}> */}
                                        <div className={swapSwitch === 'swap' ? 'swapFont selected ' : 'swapFont'} style={{ color: swapSwitch === 'swap' ? 'white' : '' }} onClick={() => setSwapSwitch('swap')}>
                                            Swap
                                        </div>
                                        <div className={swapSwitch === 'liquidity' ? ' swapFont selected' : 'swapFont'} style={{ color: swapSwitch === 'liquidity' ? 'white' : '' }} onClick={() => setSwapSwitch('liquidity')}>
                                            Liquidity
                                        </div>
                                    </div>
                                </div>

                                <div className='displayContainer'>
                                    <div className='circle fixed mr-2'><img src='/assets/image/cro.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
                                    <div className='displayLeftItems stretching'>
                                        <div className='line-items small-font'>
                                            <div>You Pay:</div>
                                            <div>Balance: 99999999999 CRO</div>
                                        </div>
                                        <div className='token-price-panel big-font'>
                                            <div>CRO</div>
                                            <div className='token-price-value'><input type='text' value={stakeNum} onChange={(e) => setStakeNum(e.target.value)} /><button className='max'>Max</button></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='swap_icon' style={{ visibility: stakedTokensFlag ? 'hidden' : 'visible' }}>
                                    <AiOutlineArrowDown className='arrow' style={{ display: 'flex', justifyContent: 'center' }} />
                                </div>

                                <div className='displayContainer'>
                                    <div className='circle fixed mr-2'><img src='/assets/image/LHRC Coin PFP.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
                                    <div className='displayLeftItems stretching'>
                                        <div className='line-items small-font'>
                                            <div>You Receive (Estimated):</div>
                                            <div>Balance: 0.000 LHRC</div>
                                        </div>
                                        <div className='token-price-panel big-font'>
                                            <div>LHRC</div>
                                            <div className='token-price-value'>5.0</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='swap-price-panel'>
                                    <div>Price</div>
                                    <div>20.0000 CRO per LHRC</div>
                                </div>

                                <div className='swapContainer'>
                                    <button>SWAP</button>
                                </div>
                            </div>

                            <div className='price-details'>
                                <div className='swap-price-detail'>
                                    <div>Minimum LHRC Received</div>
                                    <div>9999.9999 LHRC</div>
                                </div>

                                <div className='swap-price-detail'>
                                    <div>Price Impact</div>
                                    <div>&lt 0.000%</div>
                                </div>

                                <div className='swap-price-detail'>
                                    <div>Liquidity Provider Fee</div>
                                    <div>0.9999 CRO</div>
                                </div>
                            </div>
                        </div> : (scene === 'confirm' ? <SwapConfirmModal /> : <ConfirmTransactionModal />)
                    }
                </div>
                <img src='/assets/image/stake/Hills.svg' alt='hill' style={{ position: 'relative', width: '100%', height: '100%', marginTop: '-50px' }} />
            </div>

        </div>
    )
}

export default Swap