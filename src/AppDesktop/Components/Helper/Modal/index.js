import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

export default function Modal({ isOpen, toggleModal, children }) {

  return (
    <>
      {createPortal( isOpen && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      ),document.getElementById('modal-root'))}
    </>
  );
}