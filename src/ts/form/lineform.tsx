import * as React from "react";
import { Form } from "./form"

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
        return <form onSubmit={this.handleSubmit}>
                  <Form type="text"
                        placeholder="ライン名"
                        name="linename"
                        checkValue={this.checkValue}
                        />
                  <Form type="text"
                        placeholder="品番"
                        name="partnum"
                        checkValue={this.checkValue}
                        />
                  <Form type="number"
                        placeholder="サイクルタイム"
                        name="cicletime"
                        checkValue={this.checkValue}
                        />
                <input type="submit"
                        className="btn btn-default btn-block"
                        value="登録"
                       />
               </form>;
    }
}
