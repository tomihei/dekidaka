import * as React from "react";
import { List } from "./list";
import * as DB from "../indexeddb";



interface LineData {
  dbtable: string;
  value: DBLineData[];
}


export class LineList extends React.Component<{}, {}> {
  public db: DB.IndexDB;
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    // lineinfoテーブルに接続
    this.db = new DB.IndexDB("lineinfo");
    this.state = { val: []};
    // データ読み込み時ステートを更新
    this.db.onReadEvent = (mes: string, data?) => {
      if (mes === "success") {
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
  public onDelete(target) {
    let res = confirm("削除しますか?");
    if ( res === true) {
      this.db.deleteData(target);
    }
  }
  public render() {
    // tableヘッダー
    let thead = ["ライン名", "品番", "CT", ""];
    return <List
            value={this.state["val"]}
            th={thead}
            onEvent={this.onDelete}
            inputOn={false}
           />;
  }
}
