import * as React from "react";
import { LineForm } from "./form/lineform";
import * as IndexDB from "./indexeddb";
export class FormBox extends React.Component<{}, {}> {
  public db: IndexDB.LineData;
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.db = new IndexDB.LineData();
    this.db.onWriteEvent = (message: string) => {
      switch (message) {
        case "success" :
          // データベース登録完了後の処理
          alert("moi");
          break;
        case "error" :
          alert("登録に失敗しました");
          break;
        };
    };
    this.db.onReadEvent = (message: string, data?: any) => {
      switch (message) {
        case "success" :
          // データベースよりデータ読み込み後処理
          alert(data);
          break;
        case "error" :
          alert("データ読み込みに失敗しました");
      };
    };
  }
  public onSubmit(data) {
    this.db.addData(data);
  }
  public render() {
    return <div>
              <LineForm change={this.onSubmit}/>
           </div>;
  }
}
