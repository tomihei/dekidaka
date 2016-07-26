/// <reference path="../../typings/index.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import * as FormBox from "./formbox";
import { Header } from "./header";
import * as Ts from "./tes.tsx";


class Main extends React.Component<{}, {}> {
  public render() {
    return <div className="container">
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
              </Route>
            </Router>;

ReactDOM.render(
    route,
    document.getElementById("example")
);
