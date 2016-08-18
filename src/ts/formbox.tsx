import * as React from "react";
import { LineForm } from "./form/lineform";
import * as DB from "./indexeddb";
export class FormBox extends React.Component<{}, {}> {
  public db: DB.IndexDB;
  public connect: boolean = false;
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.db = new DB.IndexDB("lineinfo");
    this.db.onWriteEvent = (message: boolean) => {
      if (message) {
          // データベース登録完了後の処理
          alert("moi");
      } else {
          alert("登録に失敗しました");

      };
    };
    this.db.onReadEvent = (message: string, data?: any) => {
      if (message === "success") {
          // データベースよりデータ読み込み後処理
          alert(data);
      } else {
          alert("データ読み込みに失敗しました");
      };
    };
    this.db.onConnect = (message: boolean) => {
      if (message) {
        this.connect = true;
      } else {
        alert("DBに接続できていません");
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
