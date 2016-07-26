import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";

export class Header extends React.Component<{}, {}> {
  public render() {
    return <header>
            <div className="page-header">
              <h3>出来高管理</h3>
              <Link to="/tes">home</Link>
              <Link to="/form">ライン情報追加</Link>
            </div>
           </header>;
  }
}
