import React, { useState } from "react";
import "../styles/editor.scss";
import { SketchPicker } from "react-color";
import DrawingPanel from "./DrawingPanel";

export default function Editor() {
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("DRAW");
  const [selectedColor, setColor] = useState("#f44336");

  function initializeDrawingPanel() {
    if (
      panelWidth > 0 &&
      panelWidth <= 32 &&
      panelHeight > 0 &&
      panelHeight <= 32
    ) {
      setHideOptions(!hideOptions);
      setHideDrawingPanel(!hideDrawingPanel);

      buttonText === "DRAW"
        ? setButtonText("RESET")
        : setButtonText("DRAW");
    } else {
      alert("Please select dimensions between 1x1 and 32x32.");
    }
  }

  function changeColor(color) {
    setColor(color.hex);
  }

  return (
    <div id="editor">
      <h1>Pixel Art Maker</h1>
      <h2>Generate sprites for your project upto 32x32</h2>
      {hideDrawingPanel && <h2>Enter Sprite Dimensions (e.g 8x8,16x16,32x32) </h2>}
      {hideDrawingPanel && (
        <div id="options">
          <div className="option">
            <input
              type="number"
              className="panelInput"
              value={panelWidth}
              onChange={(e) => {
                setPanelWidth(Number(e.target.value));
              }}
              min="1"
              max="32"
            />
            <span>Width</span>
          </div>
          <div className="option">
            <input
              type="number"
              className="panelInput"
              value={panelHeight}
              onChange={(e) => {
                setPanelHeight(Number(e.target.value));
              }}
              min="1"
              max="32"
            />
            <span>Height</span>
          </div>
        </div>
      )}

      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>

      {hideOptions && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Select a Color</h2>
          <SketchPicker color={selectedColor} onChangeComplete={changeColor} />
        </div>
      )}

      {hideOptions && (
        <DrawingPanel
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
        />
      )}
    </div>
  );
}
