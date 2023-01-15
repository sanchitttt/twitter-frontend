import React from "react";
import ExploreNavbar from './ExploreNavbar';
import SearchBar from '../../Helper/SearchBar/SearchBar';
import "./styles.css";

export default function Explore() {
  return (
    <div id="explore">
      <div id="explore-topRow">
        <div id="explore-topRow-left">
          <SearchBar />
        </div>
        <div id="explore-topRow-right">
          <img
            src="https://i.ibb.co/gFhLDhC/settings-icon.png"
            alt="settingsIcon"
          />
        </div>
      </div>
      <div id="explore-navBar">
        <ExploreNavbar />
      </div>
    </div>
  );
}
