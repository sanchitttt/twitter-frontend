import React from 'react';
import Reels from '../../Components/Middle/Reels';
import RightSide from '../../Components/Right';
import './styles.css';


function ReelsPage({whoToFollowArr}) {
  return (
    <div id='reelsPage'>
        <Reels />
        <RightSide whoToFollowArr={whoToFollowArr} />
    </div>
  )
}

export default ReelsPage;