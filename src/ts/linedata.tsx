import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";
import { Graph } from "./graph";
import * as DB from "./indexeddb";
import { List } from "./list/list";

export class LineAllData extends React.Component<LineId, {}> {
  private datadb: DB.IndexDB;
  private infodata: DBLineData;
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.datadb = new DB.IndexDB("linedata");
    this.state = { val: []};
    this.datadb.onReadEvent = (mes: string, data: any) => {
      switch (mes) {
        case "success" :
          this.setState({val : data});
          break;
        case "successtable" :
          this.infodata = data;
          this.datadb.getCursorData("linepartIndex", [this.infodata.linename, this.infodata.partnum]);
          break;
      }
    };
    this.datadb.onWriteEvent = (mes: boolean) => {
      if (mes) {
        this.datadb.getCursorData("linepartIndex", [this.infodata.linename, this.infodata.partnum]);
      } else {
        alert("削除に失敗しました");
      }
    };
    this.datadb.onConnect = (mes) => {
      if (mes) {
        let key = Number(this.props.params.line_id);
        this.datadb.getDataforTable("lineinfo", key);

      }
    };
  }
  public onDelete(target) {
    let res = confirm("削除しますか?");
    if ( res === true) {
      this.datadb.deleteData(target);
    }
  }
  public render() {
    let datum = [{
      key: "Comulative Return",
      values: [
        {
          "label" : "A",
          "value" : "-12.123123",
        },
        {
          "label" : "B",
          "value" : "-10.1234",
        },
      ],
    }];
    let thead = ["加工日", "ライン名", "品番", "稼働時間", "加工数", "ライン効率", "停止時間"];
    return  <div>
              <Link to={"/output/" + this.props.params.line_id}>出来高登録</Link>
              <List
              value={this.state["val"]}
              th={thead}
              onEvent={this.onDelete}
              inputOn={false}
              />
            </div>;
  }
}
