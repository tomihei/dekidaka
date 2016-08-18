/// <reference path="../../typings/index.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import * as FormBox from "./formbox";
import { Header } from "./header";
import * as Ts from "./tes.tsx";
import * as Output from "./form/outputform";
import * as LineInfo from "./list/lineinfo";
import * as LineAllData from "./linedata";

class Main extends React.Component<{}, {}> {
  public render() {
    return  <div>
              <Header/>
              <div className="main">
                { this.props.children }
              </div>
            </div>;
  }
}

let route = <Router history={hashHistory}>
              <Route path="/" component = { Main }>
                <Route path="/form" component = { FormBox.FormBox }/>
                <Route path="/tes" component = { Ts.Ts }/>
                <Route path="/lineinfo" component = {LineInfo.LineInfo}/>
                <Route path="/lineinfo/:line_id" component = {LineAllData.LineAllData}/>
                <Route path="/output/:line_id" component = {Output.OutputForm}/>
              </Route>
            </Router>;

ReactDOM.render(
    route,
    document.getElementById("example")
);
