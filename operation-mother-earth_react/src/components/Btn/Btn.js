import React from "react";
import { HashLink } from "react-router-hash-link";

function Btn({ text1, link }) {
  return (
    <HashLink to={link}>
      <button className="buttonBar__button1">
        {" "}
        <p className="buttonBar__text">{text1}</p>
      </button>
    </HashLink>
  );
}

export default Btn;
