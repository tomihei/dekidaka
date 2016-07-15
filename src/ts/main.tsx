/// <reference path="../../typings/index.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";

import { TextForm } from "./textform";
ReactDOM.render(
    <div className="container">
      <div>
        <TextForm label="ライン名"/>
        <TextForm label="作業者名"/>
      </div>
    </div>,
    document.getElementById("example")
);
