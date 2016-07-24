import * as React from "react";
import { LineForm } from "./form/lineform";
import * as IndexDB from "./indexeddb";
export class FormBox extends React.Component<{}, {}> {
  public db: IndexDB.LineData;
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.db = new IndexDB.LineData();
    this.db.onWriteEvent = this.yey;
  }
  public yey() {
    alert("moi")
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
