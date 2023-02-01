import "./styles.css";
import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactFileReader from "react-file-reader";

export function ImagePreview({ imageList }) {
  if (imageList.length === 1) {
    return (
      <div className="imgListContainer1">
        <img src={imageList[0]} alt="icon" />
      </div>
    );
  }
  if (imageList.length === 2) {
    return (
      <div className="imgListContainer2">
        <div className="imgListContainer2Left">
          <img src={imageList[0]} alt="icon" />
        </div>
        <div className="imgListContainer2Right">
          <img src={imageList[1]} alt="icon" />
        </div>
      </div>
    );
  }
  if (imageList.length === 3) {
    return (
      <div className="imgListContainer3">
        <div className="imgListContainer3Left">
          <img src={imageList[0]} alt="icon" />
        </div>
        <div className="imgListContainer3RightContainer">
          <div className="imgListContainer3RightLeft">
            <img src={imageList[1]} alt="icon" />
          </div>
          <div className="imgListContainer3RightRight">
            <img src={imageList[2]} alt="icon" />
          </div>
        </div>
      </div>
    );
  }
  if (imageList.length === 4) {
    return (
      <div className="imgListContainer4">
        <div className="imgListContainer4Top">
            <img src={imageList[0]} alt="icon" />
            <img src={imageList[1]} alt="icon" />
        </div>
        <div className="imgListContainer4Bottom">
            <img src={imageList[2]} alt="icon" />
            <img src={imageList[3]} alt="icon" />
          
        </div>
      </div>
    );
  }
  return (
    <div>
      {imageList.map((img, idx) => {
        return <img key={idx} src={img} alt="icon" />;
      })}
    </div>
  );
}
export default function ImageSection() {
  const [imageList, setImageList] = useState([]);
  const handleFiles = (files) => {
    setImageList(files.base64);
  };
  return (
    <div className="App">
      <ReactFileReader
        fileTypes={[".csv", ".zip"]}
        base64={true}
        multipleFiles={true}
        handleFiles={handleFiles}
      >
        <button className="btn">Upload</button>
      </ReactFileReader>
      <ImagePreview imageList={imageList} />
    </div>
  );
}
