import React from "react";

import "./styles.css";

function CheckBox({ label, fn }) {
  return (
    <>
      <input
        type="checkbox"
        name="today"
        id="checkbox-1"
        onChange={(e) => fn(e.target.checked)}
      />
      <div className="checkbox">
        <label htmlFor="checkbox-1">{label}</label>
      </div>
    </>
  );
}

export default CheckBox;
