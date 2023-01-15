import React from "react";
import "./styles.css";

export default function NavBarLink({ activeLink, activeLinkHandler, children }) {
  let id = 'navBarLink' + children;
  return (
    <div
      className="NavBarLink"
      onClick={() => activeLinkHandler(children)}
    >
      <div className="NavBarLinkText" id={id}
      style={{color:activeLink===children?'#0F1419':'#536471'}}
      >
        {children}
        {activeLink === children && <div className="NavBarLinkActive"></div>}
      </div>
    </div>
  );
}
