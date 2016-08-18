import * as React from "react";
import { FormTemp,Input,FixedForm,Date } from "./form";
import {Router, Route, Link,History} from "react-router";
import * as DB from "../indexeddb";

export class OutputForm extends React.Component<LineId, {}> {
    public context: {
        router: History
    };

    static contextTypes = {
        router: React.PropTypes.object
    };
    private lineinfoDB: DB.IndexDB;
    private lineDataDB: DB.IndexDB;
    private connect: boolean = false;
    constructor(props) {
      super(props);
      this.state = {
        data: {
          date: null,
          optime: 0,
          output: 0,
          lineeffi: 0,
          stoptime: 0,
        },
        info: {
          linename: null,
          partnum: null,
          cicletime: 0,
          _id: 0,
        },
      };
      this.lineDataDB = new DB.IndexDB("linedata");
      this.lineDataDB.onWriteEvent = (mes) => {
        if (mes) {
          this.context.router.push("/lineinfo/" + this.props.params.line_id);
        }else {
          alert("登録に失敗しました");
        }
      };
      this.lineDataDB.onConnect = (mes) => {
        if (mes) {
          this.connect = true;
        }
      };
      this.lineinfoDB = new DB.IndexDB("lineinfo");
      this.lineinfoDB.onReadEvent = (mes, data) => {
        if (mes = "success") {
          this.setState({ info : data });
        }
      };
      this.lineinfoDB.onConnect = (mes) => {
        if (mes) {
          let key = Number(this.props.params.line_id);
          this.lineinfoDB.getData(key);
        }
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkValue = this.checkValue.bind(this);
    }
    public handleSubmit(e) {
      e.preventDefault();
      let data = {
          date: this.state["data"].date,
          linename: this.state["info"].linename,
          partnum: this.state["info"].partnum,
          optime: this.state["data"].optime,
          output: this.state["data"].output,
          lineeffi: this.state["data"].lineeffi,
          stoptime: this.state["data"].stoptime,
      };
      if (this.connect) {
        this.lineDataDB.addData(data);
      } else {
        alert("登録に失敗しました");
      }
      // this.props.change(this.state["data"]);
    }
    public checkValue(type, data) {
      // Formの入力を一時的に保存
      let kdata = {
        date: this.state["data"].date,
        optime: this.state["data"].optime,
        output: this.state["data"].output,
        lineeffi: this.state["data"].lineeffi,
        stoptime: this.state["data"].stoptime,
      };
      switch (type) {
        case "date" :
          kdata.date = data;
          break;
        case "optime" :
          kdata.optime = data;
          break;
        case "output" :
          kdata.output = data;
          break;
      }
      kdata.lineeffi = kdata.output * this.state["info"].cicletime / 36 / kdata.optime;
      kdata.stoptime = (1 - (kdata.lineeffi / 100 )) * kdata.optime;
      kdata.lineeffi = kdata.lineeffi.toFixed(2);
      kdata.stoptime = kdata.stoptime.toFixed(2);
      // stateに保ぞん
      this.setState({
        data: kdata,
      });
    }
    public render() {
        let LineData: LineFormData[] =
              [
              {
                  name: "optime",
                  placeholder: "稼働時間",
                  type: "number",
              },
              {
                  name: "output",
                  placeholder: "出来高",
                  type: "number",
              },
            ];
        return <div className="cover-container">
                <form onSubmit={this.handleSubmit}>
                  <Date
                    onChange={this.checkValue}
                    name="date"
                    label="日付"
                  />
                  <FormTemp
                   value={LineData}
                   checkValue={this.checkValue}
                 />
                 <FixedForm
                  value={this.state["data"].lineeffi}
                  label="ライン効率"
                 />
                 <FixedForm
                  value={this.state["data"].stoptime}
                  label="停止時間"
                 />
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary btn-block space">
                  登録
                </button>
                 </form>
                </div>;
    }
}
