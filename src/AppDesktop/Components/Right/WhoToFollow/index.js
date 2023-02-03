import React, { useEffect } from 'react';
import WhoToFollowItem from './WhoToFollowItem/index';
import './styles.css';



// const whoToFollowArr = [
//   {
//     profileSrc:
//       "https://pbs.twimg.com/profile_images/1611401994337652737/m6t_zQpl_400x400.jpg",
//     accountName: "Namya",
//     accountHandle: "namyakhaan",
//     verified: false,
//     typeOfVerification: null
//   },
//   {
//     profileSrc:
//       "https://pbs.twimg.com/profile_images/1358532039595724803/oYmImssw_400x400.jpg",
//     accountName: "DrLupo",
//     accountHandle: "DrLupo",
//     verified: true,
//     typeOfVerification: null
//   }
// ];

const WhoToFollow = ({ whoToFollowArr }) => {
  return (
    <div className="rightSide-whoToFollow-container">
      <div className="rightSide-whoToFollow-container-firstRow">
        Who to follow
      </div>
      <div className="rightSide-whoToFollow-container-secondRow">
        {whoToFollowArr.map((account, idx) => {
          return (
            <WhoToFollowItem
              key={idx}
              profileSrc={account.profileSrc}
              accountName={account.accountName}
              accountHandle={account.accountHandle}
              verified={account.verified}
              typeOfVerification={account.typeOfVerification}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WhoToFollow;
