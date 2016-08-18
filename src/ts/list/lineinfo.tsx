import * as React from "react";
import { List } from "./list";
import * as DB from "../indexeddb";
import {Router, Route, Link,History} from "react-router";



interface LineData {
  dbtable: string;
  value: DBLineData[];
}

export class LineInfo extends React.Component<{}, {}> {
  public context: {
      router: History
  };

  static contextTypes = {
      router: React.PropTypes.object
  };
  public db: DB.IndexDB;
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    // lineinfoテーブルに接続
    this.db = new DB.IndexDB("lineinfo");
    this.state = { val: []};
    // データ読み込み時ステートを更新
    this.db.onReadEvent = (mes: string, data?) => {
      if (mes === "success") {
        data.map((data) => {
            delete data['cicletime'];
        });
        this.setState({ val : data});
      } else {
        alert("データ読み込みに失敗");
      }
    };
    // 削除時データ読み込み
    this.db.onWriteEvent = (mes) => {
      if (mes) {
        this.db.getAllData();
      } else {
        alert("削除に失敗しました");
      }
    };
    // DB接続成功なら
    this.db.onConnect = (mes) => {
        if (mes) {
          // テーブルのすべてのデータを読み込む
          this.db.getAllData();
        }
    };
  }
  public onClick(target) {
    this.context.router.push("/lineinfo/" + target);
  }
  public render() {
    // tableヘッダー
    let thead = ["ライン名", "品番"];
    return <List
            value={this.state["val"]}
            th={thead}
            onEvent={this.onClick}
            inputOn={false}
           />;
  }
}
