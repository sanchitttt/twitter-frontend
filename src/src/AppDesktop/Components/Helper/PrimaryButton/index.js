import React from 'react'
import './styles.css';


function PrimaryButton({ isNotActive, clickHandler, children, blackButton = false }) {
  return (
    <button
      onClick={clickHandler}
      className={blackButton ? 'primary-button-black' : 'primary-button'}
      style={{opacity:isNotActive?0.3:1}}
      >
        {children}
    </button>
  )
}

export default PrimaryButton;