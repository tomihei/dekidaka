import * as React from "react";
import { TrData } from "./list";
import * as DB from "../indexeddb";

interface ListData {
  onEvent: Function;
  value: any[];
  th: string[];
}

interface LineData {
  dbtable: string;
  value: DBLineData[];
}

export class List extends React.Component<ListData, {}> {

  public render() {
    let tr = this.props.value.map((data) => {
      return <TrData key={data._id} value={data} onClick={this.props.onEvent}/>;
    });
    let thead = this.props.th.map((data) => {
      return <th key={data}>{data}</th>;
    });
    return <table className="table table-condensed table-striped table-hover">
             <thead>
              <tr>
                {thead}
              </tr>
             </thead>
             <tbody>
              {tr}
             </tbody>
           </table>;
  }
}
export class LineList extends React.Component<{}, {}> {
  public db: DB.IndexDB;
  public data: DBLineData[];
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    // lineinfoテーブルに接続
    this.db = new DB.IndexDB("lineinfo");

    // DBイベントのコールバック
    this.db.onReadEvent = (mes, data) => {
      if (mes === "success") {
         console.log(data);
      } else {
        alert("データ読み込みに失敗");
      }
    };
    // DB接続成功なら
    this.db.onConnect = (mes) => {
        if (mes === "connect") {
          // テーブルのすべてのデータを読み込む
          this.db.getAllData();
        }
    };
  }
  public onDelete(target) {
    console.log("moi");
  }
  public render() {
    console.log(this.data);
    // tableヘッダー
    let thead = ["ライン名", "品番", "CT", ""];
    return <List
            value={this.data}
            th={thead}
            onEvent={this.onDelete}
           />;
  }
}
