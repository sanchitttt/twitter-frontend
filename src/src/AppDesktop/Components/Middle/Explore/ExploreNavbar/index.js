import React, { useState } from "react";
import ExploreNavBarLink from '../../../Helper/NavBarLink';
import TrendingTweet from '../../../Helper/TrendingTweet';
import "./styles.css";

const links = ["For you", "Trending", "News", "Sports", "Entertainment"];

const mockData = [
  {
    topText: "Cricket · Trending",
    heading: "#SuryakumarYadav",
    subText: "37.6K Tweets"
  },
  {
    topText: "Cricket · Trending",
    heading: "#INDvSL",
    subText: "69.3K Tweets"
  },
  {
    topText: "Entertainment · Trending",
    heading: "#HBDRockingStarYash",
    subText: "77.8K Tweets"
  },
  {
    topText: "Only on Twitter · Trending",
    heading: "#sundayvibes",
    subText: "2,839 Tweets"
  },
  {
    topText: "Gaming · Trending",
    heading: "Be Ready For Quiz",
    subText: "62K Tweets"
  }
];

export default function ExploreNavbar() {
  const [activeLink, setActiveLink] = useState("For you");
  const [data, setData] = useState(mockData);

  return (
    <div id="exploreNavbarContainer" className="">
      <div id="exploreNavbarLinks">
        {links.map((link) => {
          return (
            <div key={link} className='exploreNavBarLinksContainer'>
              <ExploreNavBarLink activeLink={activeLink} activeLinkHandler={setActiveLink}>
                {link}
              </ExploreNavBarLink>
            </div>

          );
        })}
      </div>
      <div>
        {data.map((dataItem, idx) => {
          return (
            <TrendingTweet
              key={idx}
              topText={dataItem.topText}
              heading={dataItem.heading}
              subText={dataItem.subText}
            />
          );
        })}
      </div>
    </div>
  );
}
