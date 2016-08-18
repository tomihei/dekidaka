import * as React from "react";
import { FormTemp } from "./form"

export class LineForm extends React.Component<Change, {}> {
    constructor() {
      super();
      this.state = {
        data: {
          linename: null,
          partnum: null,
          cicletime: 0,
        },
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkValue = this.checkValue.bind(this);
    }
    public handleSubmit(e) {
      e.preventDefault();
      this.props.change(this.state["data"]);
    }
    public checkValue(type, data) {
      // Formの入力を一時的に保存
      let kdata = {
        linename: this.state["data"].linename,
        partnum: this.state["data"].partnum,
        cicletime: this.state["data"].cicletime,
      };
      switch (type) {
        case "linename" :
          kdata.linename = data;
          break;
        case "partnum" :
          kdata.partnum = data;
          break;
        case "cicletime" :
          kdata.cicletime = data;
          break;
      }
      // stateに保ぞん
      this.setState({
        data: kdata,
      });
    }
    public render() {
        let LineData: LineFormData[] =
              [{
                  name: "linename",
                  placeholder: "ライン名",
                  type: "text",
              },
              {
                  name: "partnum",
                  placeholder: "品番",
                  type: "text",
              },
              {
                  name: "cicletime",
                  placeholder: "サイクルタイム",
                  type: "number",
              }];
        return   <div className="cover-container">
                  <form onSubmit={this.handleSubmit}>
                  <FormTemp
                   value={LineData}
                   checkValue={this.checkValue}
                   />
                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary btn-block space">
                    登録
                  </button>
                  </form>
                 </div>;
    }
}
