import React from 'react';
// import styledComponents from 'styled-components';

// import itemImg from '../../assets/image/1x/Asset 5.png'
import './featureItem.scss'

const FeatureItem = (props) => {
    return (
        <div>
            <div className='featureItem'>
                {/* <img src={itemImg} alt='item-img' style={{ width: '140px', height: '90px' }} /> */}
                <div className='itemTitle'>FEATURE<br />ITEM #1</div>
                <div className='itemDesc'>Text info goes here.</div>
            </div>
        </div>
    )
}

export default FeatureItem